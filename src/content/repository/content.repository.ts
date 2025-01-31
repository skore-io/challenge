import { DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Content } from 'src/content/entity'

@Injectable()
export class ContentRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findOne(contentId: string): Promise<Content | null> {
    const [content] = await this.dataSource.query<Content[]>(
      `SELECT * FROM contents WHERE id = '${contentId}' AND deleted_at IS NULL LIMIT 1`,
    )

    return content || null
  }
}
