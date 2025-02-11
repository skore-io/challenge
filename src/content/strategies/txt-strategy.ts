import * as fs from 'fs'
import * as path from 'path'
import { URL } from 'url'
import { ProvisionDto } from '../dto/provision.dto'
import { ContentStrategy } from './content-strategy.interface'

export class TxtStrategy implements ContentStrategy {
  provision(content: any, url: string, bytes: number): ProvisionDto {
    ///checa a existencia da url
    if (!content.url) {
      throw new Error('Content URL is missing')
    }

    //checa o caminho
    const fileUrl = new URL(content.url)
    const filePath = path.join(__dirname, '../../..', 'static', path.basename(fileUrl.pathname))

    if (!filePath.startsWith(path.resolve(__dirname, '../../..', 'static'))) {
      throw new Error(`File not found: ${filePath}`)
    }

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }

    const textContent = fs.readFileSync(filePath, 'utf-8')
    const textContentSanitized = textContent.replace(/</g, '&lt;').replace(/>/g, '&gt;') //sanitizando o texto

    return {
      id: content.id,
      title: content.title,
      cover: content.cover,
      created_at: content.created_at,
      description: content.description, // Manter a descrição original
      contentBody: textContentSanitized, // Novo campo com o corpo do texto
      total_likes: content.total_likes,
      type: 'text',
      url,
      allow_download: true,
      is_embeddable: true,
      format: 'txt',
      bytes,
      metadata: { word_count: textContentSanitized.split(' ').length },
    }
  }
}
