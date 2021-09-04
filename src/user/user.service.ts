import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceParkingDto } from 'src/place-parking/dto/place-parking.dto';
import { PlaceParking } from 'src/place-parking/entities/place-parking.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
    private userService: UserService
  ) {}

  create(createUserDto: UserDto): Promise<User> {
    createUserDto.password=this.authService.hashPassword(createUserDto.password);
    return this.userRepository.save(createUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<any>{
    const user = await this.userService.findOne(loginUserDto.name);
    if(this.validateUser(loginUserDto.name, loginUserDto.password)){
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(name: string): Promise<User> {
    return this.userRepository.findOne({name});
  }

  async update(name: string, updateUserDto: UserDto): Promise<void> {
    await this.userRepository.update({name}, updateUserDto);
  }

  async remove(name: string): Promise<void> {
    await this.userRepository.delete({name});
  }

  private validateUser(name: string, password: string): Promise<boolean> {
    return this.authService.validateUser(name, password);
  }

  async findByName(name: string): Promise<User> {
    return this.userRepository.findOne({name});
  }

  async assignPlace(userDto: UserDto, placeParkingDto: PlaceParkingDto): Promise<void>{
    userDto.placeParking = placeParkingDto;
    await this.userRepository.update(userDto.name, userDto);
  }

  async unassignPlace(userDto: UserDto): Promise<void> {
    userDto.placeParking = null;
    await this.userRepository.update(userDto.name, userDto);
  }

  async findPlace(userDto: UserDto): Promise<PlaceParkingDto> {
    return userDto.placeParking;
  }
}
