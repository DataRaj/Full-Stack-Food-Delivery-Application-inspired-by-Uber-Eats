import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { createAccountInput } from "./dto/create-account.dto";
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
}
