import { ProvisionDto } from '../dto/provision.dto'
import { ContentStrategy } from './content-strategy.interface'

export class LinkStrategy implements ContentStrategy {
    provision(content: any, url: string, bytes: number): ProvisionDto {
        return {
            id: content.id,
            title: content.title,
            cover: content.cover,
            created_at: content.created_at,
            description: content.description,
            total_likes: content.total_likes,
            type: 'link',
            url: content.url || '',
            allow_download: false,
            is_embeddable: true,
            format: null,
            bytes: 0,
            metadata: { trusted: content.url?.includes('https') || false },
        }
    }
}
