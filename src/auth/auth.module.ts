import { forwardRef, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "./constants";
import { JwtAuthGuard } from "./jwt-auth-guard";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from './services/auth/auth.service';

@Module({
  providers: [
    AuthService,
    LocalAuthGuard,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  exports: [AuthService],
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ]
})
export class AuthModule {}