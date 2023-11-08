// import { Query } from "@nestjs/common";
import { Resolver ,Query , Args, Mutation} from "@nestjs/graphql";
import { Restaurant } from "./entities/restaurant.entity";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { RestaurantService } from "./restaurant.service";
@Resolver(of => Restaurant)
export class RestaurantsResolver{
    constructor(private readonly restaurantService : RestaurantService){}
    @Query(returns => [Restaurant])
    restaurants() : Promise<Restaurant[]>{
        return this.restaurantService.getAll();
    }
    @Mutation(returns => Boolean)
    async createRestaurants(
        @Args() createRestaurantDto : CreateRestaurantDto,
    ) : Promise<boolean> {
        console.log(CreateRestaurantDto)
        try{
        await this.restaurantService.createRestaurant(createRestaurantDto);
        return true;
        } catch(e){
            console.log(e);
            return false;
        }
    }
}