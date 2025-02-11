import * as fs from 'fs'
import * as path from 'path'
import { URL } from 'url'
import { ProvisionDto } from '../dto/provision.dto'
import { ContentStrategy } from './content-strategy.interface'

export class ImageStrategy implements ContentStrategy {
  provision(content: any, url: string, bytes: number): ProvisionDto {
    //checa a url
    if (!content.url) {
      throw new Error('Content URL is missing')
    }

    //checa o caminho
    const fileUrl = new URL(content.url)
    const filePath = path.join(__dirname, '../../..', 'static', path.basename(fileUrl.pathname))

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }

    const format = path.extname(filePath).slice(1) || 'jpg'

    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: 'image',
      url,
      allow_download: true,
      is_embeddable: true,
      format,
      bytes,
      metadata: { resolution: '1920x1080', aspect_ratio: '16:9' },
    }
  }
}
