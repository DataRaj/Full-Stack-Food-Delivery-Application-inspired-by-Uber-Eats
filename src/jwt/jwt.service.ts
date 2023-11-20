import { Injectable, Inject} from '@nestjs/common';
import { JwkKeyExportOptions } from 'crypto';
import { JwtModuleOptions } from './interfaces/jwt-module-options.interface';
import { CONFIG_OPTIONS } from './jwt.constant';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtService {
    constructor(
       @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
    ) {}
    sign(userId:number):string{
        return jwt.sign({id:userId},this.options.privateKey);
    }
    verify(token: string) {
        return jwt.verify(token, this.options.privateKey);
      }
    }
