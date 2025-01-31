import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContentService } from 'src/content/service'
import { ContentResolver } from 'src/content/resolver'
import { Content } from 'src/content/entity'
import { ContentRepository } from 'src/content/repository'
import { UserModule } from 'src/user'

@Module({
  imports: [TypeOrmModule.forFeature([Content]), UserModule],
  providers: [ContentService, ContentRepository, ContentResolver],
})
export class ContentModule {}
