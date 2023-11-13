import { ArgsType, Field, InputType, OmitType,PickType} from "@nestjs/graphql";
import {IsString, IsBoolean} from 'class-validator'
import { Restaurant } from "../entities/restaurant.entity";

// @InputType()
// export class CreateRestaurantDto {}
@ArgsType()
export class CreateRestaurantDto extends PickType(Restaurant,["name", "isVegan", "address","ownersName","categoryName"]){}