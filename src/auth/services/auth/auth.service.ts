import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { from, Observable } from 'rxjs';
import { jwtConstants } from 'src/auth/constants';
import { UserService } from 'src/user/user.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService extends PassportStrategy(Strategy){
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private jwtService: JwtService,
        private moduleRef: ModuleRef
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
            passReqToCallBack: true
        });
    }

    hashPassword(password: string): string{
        return bcrypt.hash(password, 12);
    }

    private comparePassword(password: string, storedPasswordHash: string): Observable<any>{
        return from(bcrypt.compare(password, storedPasswordHash));
    }

    async validateUser(name: string, passwordEntered: string): Promise<any> {
        const user = await this.userService.findByName(name);
        if (this.comparePassword(user.password, passwordEntered)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

    async login(user: any) {
        if(this.validateUser(user.name, user.password)){
            const payload = { name: user.name, password: user.password };
            return {
                access_token: this.jwtService.sign(payload),
            }; 
        }
    }

    async validate(payload: any){
        return { name: payload.name, password: payload.password };
    }
}
