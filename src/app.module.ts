import { HttpStatus, Module } from '@nestjs/common'
import { GraphQLError } from 'graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { ContentModule } from './content'
import { UserModule } from './user'
import { CompanyModule } from './company'
import { ApolloDriver } from '@nestjs/apollo'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      introspection: true,
      playground: true,
      formatError: (error: GraphQLError) => {
        return {
          message: error.extensions?.originalError?.['message'],
          status_code:
            Number(error.extensions?.originalError?.['statusCode']) ||
            Number(error?.extensions?.code) ||
            HttpStatus.BAD_REQUEST,
          details: error?.extensions?.exception?.['details'] || error.extensions?.details,
        }
      },
    }),

    ContentModule,
    UserModule,
    CompanyModule,
  ],
})
export class AppModule { }
