import { forwardRef, Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceParkingModule } from 'src/place-parking/place-parking.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    PlaceParkingModule
  ],
  exports: [UserService]
})
export class UserModule {}
