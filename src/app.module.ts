import { Module } from '@nestjs/common';
import { GraphQLModule} from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import * as Joi from 'joi';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from './jwt/jwt.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        // MAILGUN_API_KEY: Joi.string().required(),
        // MAILGUN_DOMAIN_NAME: Joi.string().required(),
        // MAILGUN_FROM_EMAIL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type : 'postgres',
      host : 'localhost', //process.env.DB_HOST,
      port :  +'5432', //process.env.DB_PORT,
      username :'postgres', //process.env.DB_USERNAME,
      password : 'dhadas123', //process.env.DB_PASSWORD +"",
      database : 'Uber-Eats', //process.env.DB_NAME,
      // secrete_key : process.env.SECRETE_KEY,
      autoLoadEntities : true,
      synchronize : true,
      logging : true,
      entities : [User]
    }), 
    JwtModule.forRoot({
      privateKey: 'v96eQGPK9OK08LKWbGeslkCADAGDVB0M',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver : ApolloDriver,
      autoSchemaFile : true,
    }),
    RestaurantsModule,
    UsersModule,
    CommonModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
