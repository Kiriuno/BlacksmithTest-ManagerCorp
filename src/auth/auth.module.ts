import { forwardRef, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { jwtConstants } from "./constants";
import { JwtAuthGuard } from "./jwt-auth-guard";
import { JwtStrategy } from "./jwt.strategy";
import { LocalAuthGuard } from "./local-auth.guard";
import { LocalStrategy } from "./local.strategy";
import { AuthService } from './services/auth/auth.service';

@Module({
  providers: [
    AuthService,
    LocalAuthGuard,
    JwtAuthGuard,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    LocalStrategy
  ],
  exports: [AuthService],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    }),
    forwardRef(() => UserModule)
  ]
})
export class AuthModule {}