import * as fs from 'fs'
import * as path from 'path'
import { URL } from 'url'
import { ProvisionDto } from '../dto/provision.dto'
import { ContentStrategy } from './content-strategy.interface'

export class VideoStrategy implements ContentStrategy {
  provision(content: any, url: string, bytes: number): ProvisionDto {
    //checa existencia da url
    if (!content.url) {
      throw new Error('Content URL is missing')
    }

    const fileUrl = new URL(content.url)
    const filePath = path.join(__dirname, '../../..', 'static', path.basename(fileUrl.pathname))
    //checa o caminho
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }

    const format = path.extname(filePath).slice(1) || 'mp4'

    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description,
      total_likes: content.total_likes,
      type: 'video',
      url,
      allow_download: false,
      is_embeddable: true,
      format,
      bytes,
      metadata: { resolution: '1080p', aspect_ratio: '16:9', duration: 10 },
    }
  }
}
