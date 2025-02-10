import { BadRequestException, Injectable } from '@nestjs/common'
import { Content } from 'src/content/entity/content.entity'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class ContentRepository {
  private readonly contentRepository: Repository<Content>

  constructor(private readonly dataSource: DataSource) {
    this.contentRepository = this.dataSource.getRepository(Content)
  }

  async findOne(contentId: string): Promise<Content> {
    if (!contentId) {
      throw new BadRequestException('Content ID não encontrado')
    }

    const content = await this.contentRepository.findOne({
      where: { id: contentId, deleted_at: null },
    })

    return content || null;
  }
}
