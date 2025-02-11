// src/content/strategies/pdf-strategy.ts
import { ContentStrategy } from './content-strategy.interface'
import { ProvisionDto } from '../dto/provision.dto'

export class PdfStrategy implements ContentStrategy {
  provision(content: any, url: string, bytes: number): ProvisionDto {
    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: 'pdf',
      url,
      allow_download: true,
      is_embeddable: false,
      format: 'pdf',
      bytes,
      metadata: {
        author: 'Unknown',
        pages: Math.floor(bytes / 50000) || 1,
        encrypted: false,
      },
    }
  }
}
