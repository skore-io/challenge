import { Logger, UseGuards } from '@nestjs/common'
import { Resolver, Args, Context, Query } from '@nestjs/graphql'
import { ContentService } from '../service'
import { ProvisionDto } from '../dto'
import { AuthGuard } from '../../user/guard'

@Resolver()
export class ContentResolver {
  private readonly logger = new Logger(ContentResolver.name)

  constructor(private readonly contentService: ContentService) { }

  @UseGuards(AuthGuard)
  @Query(() => ProvisionDto)
  provision(@Args('content_id') contentId: string, @Context('req') req): Promise<ProvisionDto> {
    this.logger.log(`Provisioning content=${contentId} to user=${req.user.id}`)
    return this.contentService.provision(contentId)
  }
}
