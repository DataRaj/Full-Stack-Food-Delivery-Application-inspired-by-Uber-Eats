import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { createAccountInput } from "./dto/create-account.dto";
import { LoginInput } from "./dto/login.dto";
@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly users: Repository<User>,){}

    async createAccount({email,password,role}:createAccountInput):Promise<string | undefined>{
        try{
            const error = await this.users.findOneBy({email});
            if(error){
                // return{
                //     ok : false,
                //     error,
                // }
              return "There is a user with that email already"
            }
            await this.users.save(this.users.create({email,password,role}));
            return 
        }catch(e){
            return "couldn't ceate account"
        }
    }
    async login({
        email,
        password,
    }:LoginInput): Promise<{ok : boolean; error?: string; token: string}>{
        // find user with the email
        // verify the password with email
        // make a JWT and give it to the user
        try{
            const user= await this.users.findOneBy({email})
            if(!user){
                return {
                    ok: false,
                    error : "User cannot found",
                    token : ''
                };
            }
            const passwordCorrect = await user.checkPassword(password);
            if(!passwordCorrect){
                return {
                    ok : false,
                    error : 'wrong password',
                    token : 'ok'
                }
            }
        }catch(e){
            return {
                ok: false,
                error : "" + UnauthorizedException,
                token: 'correct '
            }
        }
    }
}
