import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/loginUser.dto';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto): Promise<any>{
    return this.userService.login(loginUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() userDto: UserDto): Promise<void> {
    return this.userService.update(id, userDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
