import { Module } from '@nestjs/common';
import { RestaurantsResolver } from './restaurants.resolver';
import { Restaurant } from './entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from './restaurant.service';
@Module({
    imports : [TypeOrmModule.forFeature([Restaurant])],
    providers : [RestaurantsResolver, RestaurantService]
})
export class RestaurantsModule {}
// what to add the next thing 