import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { MutationOutput } from "src/common/dto/output.dto";
import { User } from "../entities/user.entity";

@ObjectType()
export class LoginInput extends PickType(User,["email", "password"]){}

@ObjectType()
@InputType()
export class LoginOutput extends MutationOutput{
    @Field(type =>  String, {nullable : true})
    token?: string;
}