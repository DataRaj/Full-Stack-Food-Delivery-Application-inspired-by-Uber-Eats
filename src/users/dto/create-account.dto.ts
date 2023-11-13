// import { PickType } from "@nestjs/mapped-types";
import { User } from "../entities/user.entity";
import { ArgsType, Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { IsEnum, IsString } from "class-validator";
import { UserRole } from "../enums/userRole.enum";
// error situation here: It has problems with the mapped-types objects, like: Picktype,Omit....
// thats why I am not implementing easy way of imitating a other readymade fields and schemas if you want to impolement the pickType then please extend the class with given line below 
// extends PickType(User, ["email","password","role"])
@ObjectType()
@InputType()
export class createAccountInput extends PickType(User, ["email","password","role"]) {}

@ObjectType()
export class CreateAccountOutput{
    @Field(type =>String, { nullable : true})
    error?: string;

    @Field(type => Boolean)
    ok: Boolean
}