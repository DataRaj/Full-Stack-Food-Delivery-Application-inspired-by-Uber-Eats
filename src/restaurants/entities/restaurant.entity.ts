import { Field, ObjectType, InputType} from '@nestjs/graphql'
import { IsBoolean, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({isAbstract : true})
@ObjectType()
@Entity()
export class Restaurant{
    @PrimaryGeneratedColumn()
    @Field(type=>Number)
    @IsNumber()
    id : number

    @Field(type=>String)
    @Column()
    @IsString()
    @Length(5)
    name : String;

    @Field(type => Boolean, {defaultValue : true})
    @Column({default : true})
    @IsOptional()
    @IsBoolean()
    isVegan ?: Boolean;

    @Field(type => String)
    @Column()
    @IsString()
    address : string;

    @Field(type => String)
    @Column()
    @IsString()
    ownersName : string;

    @Field(type=> String)
    @Column()
    @IsString()
    categoryName : string
}