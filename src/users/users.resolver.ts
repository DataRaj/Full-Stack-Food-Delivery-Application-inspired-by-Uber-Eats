import { Resolver, Query, Mutation, Args} from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "./users.service";
import { CreateAccountOutput, createAccountInput } from "./dto/create-account.dto";
import { LoginInput, LoginOutput } from "./dto/login.dto";
// import { Query } from "@nestjs/common";

@Resolver(of => User)
export class UsersResolver{
    constructor(private readonly userService : UserService){}

    @Query(returns=> Boolean)
    hi(){
        return true;
    }

    @Mutation(returns =>CreateAccountOutput)
    async createAccount(@Args("input") createAccountInput: createAccountInput,):Promise<CreateAccountOutput>{
        try{
            const [ok, error] = await this.userService.createAccount(createAccountInput);
            if(error){
                return {
                    ok : false,
                    error,
                };
            }
            return {
                ok : true
            }
        }catch(e){
            return {
                error : e,
                ok : false,
            }
        }
    }
    @Mutation(returns=> LoginOutput)
    async login(@Args('input') loginInput : LoginInput): Promise<LoginOutput>{
        try{
            const {ok,error,token} = await this.userService.login(loginInput)
            return {ok,error,token}
        }catch(e){

        }
    }
}
