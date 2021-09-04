import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/user.entity';
// import { UserProviders } from './provider/user.providers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserController],
  providers: [UserService, /*...UserProviders*/],
  imports: [AuthModule, TypeOrmModule.forFeature([User])]
})
export class UserModule {}
