import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/entity'
import { AuthGuard } from 'src/user/guard'
import { UserRepository } from 'src/user/repository'
import { AuthService } from 'src/user/service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthGuard, UserRepository, AuthService],
  exports: [AuthGuard, AuthService],
})
export class UserModule {}
