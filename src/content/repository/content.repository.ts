import { BadRequestException, Injectable } from '@nestjs/common'
import { Content } from 'src/content/entity/content.entity'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class ContentRepository {
  private readonly contentRepo: Repository<Content>

  constructor(private readonly dataSource: DataSource) {
    this.contentRepo = this.dataSource.getRepository(Content)
  }

  async findOne(contentId: string): Promise<Content> {
    if (!contentId) {
      throw new BadRequestException('Content ID cannot be empty.')
    }

    const content = await this.contentRepo.findOne({
      where: { id: contentId, deleted_at: null },
    })

    if (!content) {
      return null
    }

    return content
  }
}
