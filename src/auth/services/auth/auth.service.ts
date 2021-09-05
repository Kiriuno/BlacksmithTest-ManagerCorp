import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService{
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

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
        const payload = { name: user.name, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        }; 
    }
}
