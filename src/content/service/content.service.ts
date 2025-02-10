import * as fs from 'fs'
import * as path from 'path'
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ContentRepository } from '../repository'
import { ProvisionDto } from '../dto'

interface Content {
  id: string;
  title: string;
  cover?: string;
  created_at: Date;
  description?: string;
  total_likes: number;
  type?: string;
  url?: string;
}

interface Metadata {
  [key: string]: any;
}


@Injectable()
export class ContentService {
  private readonly logger = new Logger(ContentService.name)
  private readonly expirationTime = 3600 // 1 hour

  constructor(private readonly contentRepository: ContentRepository) { }

  async getContent(contentId: string): Promise<Content | null> {
    try {
      const content = await this.contentRepository.findOne(contentId);
      if (!content) {
        this.logger.warn(`Content not found for id=${contentId}`);
        throw new NotFoundException(`Content not found: ${contentId}`);
      }
      return content;
    } catch (error) {
      this.logger.error(`Error fetching content: ${error}`);
      throw new NotFoundException(`Database error: ${error}`);
    }
  }

  async getFileSize(filePath: string): Promise<number> {
    try {
      return fs.existsSync(filePath) ? fs.statSync(filePath).size : 0;
    } catch (error) {
      this.logger.error(`File system error: ${error}`);
      return 0;
    }
  }

  generateMetadataForType(content: Content, bytes: number): Metadata {
    switch (content.type) {
      case 'pdf':
        return {
          author: 'Unknown',
          pages: Math.floor(bytes / 50000) || 1,
          encrypted: false,
        };
      case 'image':
        return { resolution: '1920x1080', aspect_ratio: '16:9' };
      case 'video':
        return { duration: Math.floor(bytes / 100000) || 10, resolution: '1080p' };
      case 'link':
        return { trusted: content.url?.includes('https') || false };
      default:
        return {};
    }
  }

  createProvisionResponse(content: Content, bytes: number, url: string, metadata: Metadata): ProvisionDto {
    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: content.type!,
      url,
      allow_download: content.type !== 'link',
      is_embeddable: content.type !== 'link',
      format: path.extname(content.url || '').slice(1) || null,
      bytes,
      metadata,
    };
  }

  async provisionContent(contentId: string): Promise<ProvisionDto> {
    if (!contentId) {
      this.logger.error(`Invalid Content ID: ${contentId}`);
      throw new UnprocessableEntityException(`Content ID is invalid: ${contentId}`);
    }

    this.logger.log(`Provisioning content for id=${contentId}`);

    const content = await this.getContent(contentId);
    const filePath = content.url || '';
    const bytes = await this.getFileSize(filePath);
    const url = this.generateSignedUrl(content.url || '');

    if (!content.type) {
      this.logger.warn(`Missing content type for ID=${contentId}`);
      throw new BadRequestException('Content type is missing');
    }

    const metadata = this.generateMetadataForType(content, bytes);

    return this.createProvisionResponse(content, bytes, url, metadata);
  }

  async provision(contentId: string): Promise<ProvisionDto> {
    try {
      return await this.provisionContent(contentId);
    } catch (error) {
      this.logger.error(`Error during content provisioning: ${error}`);
      throw new BadRequestException(`Error provisioning content: ${error}`);
    }
  }

  generateSignedUrl(originalUrl: string): string {
    const expires = Math.floor(Date.now() / 1000) + this.expirationTime
    return `${originalUrl}?expires=${expires}&signature=${Math.random().toString(36).substring(7)}`
  }
}
