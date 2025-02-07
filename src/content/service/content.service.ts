import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { ProvisionDto } from 'src/content/dto'
import { Content } from 'src/content/entity'
import { ContentType } from 'src/content/enum/content-type.enum'
import { ContentRepository } from 'src/content/repository'

@Injectable()
export class ContentService {
  private readonly logger = new Logger(ContentService.name)
  private readonly expirationTime = 3600 // 1 hour

  constructor(private readonly contentRepository: ContentRepository) {}

  async provision(contentId: string): Promise<ProvisionDto> {
    if (!contentId) {
      this.logger.error(`Invalid Content ID: ${contentId}`)
      throw new UnprocessableEntityException(`Content ID is invalid: ${contentId}`)
    }

    this.logger.log(`Provisioning content for id=${contentId}`)
    let content: Content

    try {
      content = await this.contentRepository.findOne(contentId)
    } catch (error) {
      this.logger.error(`Database error while fetching content: ${error.message}`)
      throw new NotFoundException(`Database error: ${error.message}`)
    }

    if (!content) {
      this.logger.warn(`Content not found for id=${contentId}`)
      throw new NotFoundException(`Content not found: ${contentId}`)
    }

    if (!content.type) {
      this.logger.warn(`Missing content type for ID=${contentId}`)
      throw new BadRequestException('Content type is missing')
    }

    if (!Object.values(ContentType).includes(content.type)) {
      this.logger.warn(`Unsupported content type for ID=${contentId}: ${content.type}`)
      throw new BadRequestException(`Unsupported content type: ${content.type}`)
    }

    const url = content.url ? this.generateSignedUrl(content.url) : ''
    const bytes = this.getFileSize(content.url)

    return this.buildProvisionResponse(content, url, bytes)
  }

  private generateSignedUrl(originalUrl: string): string {
    const expires = Math.floor(Date.now() / 1000) + this.expirationTime
    return `${originalUrl}?expires=${expires}&signature=${Math.random().toString(36).substring(7)}`
  }

  private getFileSize(filePath?: string): number {
    if (!filePath || !fs.existsSync(filePath)) return 0
    try {
      return fs.statSync(filePath).size
    } catch (error) {
      this.logger.error(`File system error: ${error.message}`)
      return 0
    }
  }

  private buildProvisionResponse(content: Content, url: string, bytes: number): ProvisionDto {
    const metadata = this.getMetadata(content, bytes)

    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: content.type,
      url,
      allow_download: content.type !== ContentType.VIDEO && content.type !== ContentType.LINK,
      is_embeddable: content.type !== ContentType.PDF,
      format:
        content.type === ContentType.LINK
          ? null
          : content.url
            ? path.extname(content.url).slice(1) || this.getDefaultFormat(content.type)
            : this.getDefaultFormat(content.type),
      bytes,
      text_content: content.text_content || '',
      metadata,
    }
  }

  private getDefaultFormat(type: ContentType): string {
    const defaultFormats = {
      [ContentType.IMAGE]: 'jpg',
      [ContentType.VIDEO]: 'mp4',
      [ContentType.PDF]: 'pdf',
      [ContentType.TEXT]: 'txt',
    }
    return defaultFormats[type] || 'txt'
  }

  private getMetadata(content: Content, bytes: number): object {
    switch (content.type) {
      case ContentType.PDF:
        return {
          pages: Math.floor(bytes / 50000) || 1,
          author: 'Unknown',
          encrypted: false,
        }
      case ContentType.IMAGE:
        return { resolution: '1920x1080', aspect_ratio: '16:9' }
      case ContentType.VIDEO:
        return { duration: Math.floor(bytes / 100000) || 10, resolution: '1080p' }
      case ContentType.LINK:
        return { trusted: content.url?.includes('https') || false }
      case ContentType.TEXT:
        return { word_count: content.text_content?.split(' ').length || 0 }
      default:
        return {}
    }
  }
}
