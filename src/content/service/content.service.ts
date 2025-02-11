import * as fs from 'fs'
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ContentRepository } from 'src/content/repository'
import { ProvisionDto } from 'src/content/dto'
import { contentStrategies } from '../strategies/content-strategies'

@Injectable()
export class ContentService {
  private readonly logger = new Logger(ContentService.name)
  private readonly expirationTime = 3600

  constructor(private readonly contentRepository: ContentRepository) { }

  async provision(contentId: string): Promise<ProvisionDto> {
    if (!contentId) {
      throw new UnprocessableEntityException('Content ID is missing')
    }

    let content
    try {
      content = await this.contentRepository.findOne(contentId)
      if (!content) {
        this.logger.warn(`Content not found for id=${contentId}`)
        throw new NotFoundException(`Content not found: ${contentId}`)
      }
    } catch (error) {
      throw new NotFoundException(`Database query error! ${error}`)
    }

    const filePath = content.url ? content.url : undefined
    let bytes = 0

    try {
      bytes = fs.existsSync(filePath) ? fs.statSync(filePath).size : 0
    } catch (error) {
      this.logger.error(`File system error: ${error}`)
    }

    const url = this.generateSignedUrl(content.url || '')

    if (!content.type) {
      this.logger.warn(`Missing content type for ID=${contentId}`)
      throw new BadRequestException('Content type is missing')
    }

    // Usa a estratégia correspondente ao tipo de conteúdo
    const strategy = contentStrategies[content.type]
    if (!strategy) {
      this.logger.warn(`Unsupported content type for ID=${contentId}, type=${content.type}`)
      throw new BadRequestException(`Unsupported content type: ${content.type}`)
    }

    return strategy.provision(content, url, bytes)
  }

  private generateSignedUrl(originalUrl: string): string {
    const expires = Math.floor(Date.now() / 1000) + this.expirationTime
    return `${originalUrl}?expires=${expires}&signature=${Math.random().toString(36).substring(7)}`
  }
}
