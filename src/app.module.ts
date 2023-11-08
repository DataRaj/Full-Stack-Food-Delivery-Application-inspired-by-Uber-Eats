import { Module } from '@nestjs/common';
import { GraphQLModule} from '@nestjs/graphql'
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';

// import * as Joi from 'joi' 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : process.env.NODE_ENV === "dev" ? ".dev.env" : ".test.env",
      ignoreEnvFile : process.env.NODE_ENV === 'prod',
    }) , 
    TypeOrmModule.forRoot({
      type : 'postgres',
      host :  'localhost', //process.env.DB_HOST,
      port :   5432,  //+process.env.DB_PORT,
      username : 'postgres', //process.env.DB_USERNAME,
      password : 'dhadas123',  //process.env.DB_PASSWORD +"",
      database : 'Uber-Eats',  //process.env.DB_NAME,
      autoLoadEntities : true,
      synchronize : true,
      logging : true,
      entities : [User]
    }), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver : ApolloDriver,
      autoSchemaFile : true,
    }),
    RestaurantsModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
