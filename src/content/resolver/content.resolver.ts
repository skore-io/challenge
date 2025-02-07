import { Logger, UseGuards } from '@nestjs/common'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { ProvisionDto } from 'src/content/dto'
import { ContentService } from 'src/content/service'
import { AuthGuard } from 'src/user/guard'

@Resolver()
export class ContentResolver {
  private readonly logger = new Logger(ContentResolver.name)

  constructor(private readonly contentService: ContentService) {}

  @UseGuards(AuthGuard)
  @Query(() => ProvisionDto)
  async provision(
    @Args('content_id', { type: () => String }) contentId: string,
    @Context('req') req,
  ): Promise<ProvisionDto> {
    try {
      this.logger.log(`Provisioning content=${contentId} to user=${req.user.id}`)
      return await this.contentService.provision(contentId)
    } catch (error) {
      this.logger.error(`Error in provision: ${error.message}`)
      throw error
    }
  }
}
