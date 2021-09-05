import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, Logger, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { PlaceParkingDto } from 'src/place-parking/dto/place-parking.dto';
import { PlaceParking } from 'src/place-parking/entities/place-parking.entity';
import { AuthGuard } from '@nestjs/passport';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/register')
  async create(@Body() userDto: UserDto): Promise<User> {
    this.logger.log(userDto);
    return this.userService.create(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<void> {
    return this.userService.update(id, userDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
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
