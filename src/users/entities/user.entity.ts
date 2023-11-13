import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import * as bcrypt from "bcrypt" 
import { BeforeInsert, Column, Entity } from "typeorm";
import { UserRole } from "../enums/userRole.enum";
import { CoreEntity } from "src/common/entities/core.entity";
import { InternalServerErrorException } from "@nestjs/common";

registerEnumType(UserRole, {name : 'UserRole'})

@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity{

    @Column()
    @Field(type => String)
    email:string

    @Column()
    @Field(type => String)
    password:string 

    @Column({type : 'enum', enum : UserRole})
    @Field(type => UserRole)
    role : UserRole

    @BeforeInsert()
    async hashpassword(): Promise<void>{
        try{
            this.password = await  bcrypt.hash(this.password, 10);
        } catch(e){
            console.log(e)
            throw new InternalServerErrorException();
        }
    }
}