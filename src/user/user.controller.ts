import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/loginUser.dto';
import { Observable } from 'rxjs';
import { PlaceParkingDto } from 'src/place-parking/dto/place-parking.dto';
import { PlaceParking } from 'src/place-parking/entities/place-parking.entity';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:name')
  async findOne(@Param('name') name: string): Promise<User> {
    return this.userService.findOne(name);
  }

  @Patch('/:name')
  async update(@Param('name') name: string, @Body() userDto: UserDto): Promise<void> {
    return this.userService.update(name, userDto);
  }

  @Delete('/:name')
  async remove(@Param('name') name: string): Promise<void> {
    return this.userService.remove(name);
  }

  @Patch('assignPlace')
  async assignPlace(@Body() userDto: UserDto, placeParking: PlaceParkingDto): Promise<void> {
    return this.userService.assignPlace(userDto, placeParking);
  }

  @Patch('unassignPlace')
  async unassignPlace(@Body() userDto: UserDto): Promise<void> {
    return this.userService.unassignPlace(userDto);
  }

  @Get('findPlace')
  async findPlace(@Body() userDto: UserDto): Promise<PlaceParking> {
    return this.userService.findPlace(userDto);
  }
}
