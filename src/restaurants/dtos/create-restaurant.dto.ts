import { ArgsType, Field, InputType, OmitType} from "@nestjs/graphql";
import {IsString, IsBoolean} from 'class-validator'
import { Restaurant } from "../entities/restaurant.entity";

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id'], InputType){}
// @ArgsType()
// export class CreateRestaurantDto{
//     @Field(type => String)
//     @IsString()
//     name : string;

//     @Field(type => Boolean)
//     @IsBoolean()
//     isVegan : boolean;


//     @Field(type => String)
//     @IsString()
//     address : string;

//     @Field(type => String)
//     @IsString()
//     ownersName : string;

//     @Field(type=> String)
//     @IsString()
//     categoryName : string
// }