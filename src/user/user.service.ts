import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceParkingDto } from 'src/place-parking/dto/place-parking.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    createUserDto.password=this.authService.hashPassword(createUserDto.password);
    const { name, password, isAdmin } = createUserDto;
    const user: User = await this.userRepository.create({name, password, isAdmin});
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UserDto): Promise<void> {
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByName(name: string): Promise<User> {
    return this.userRepository.findOne({name});
  }

  async assignPlace(userDto: UserDto, placeParkingDto: PlaceParkingDto): Promise<void>{
    userDto.placeParking = placeParkingDto;
    await this.userRepository.save(userDto);
  }

  async unassignPlace(userDto: UserDto): Promise<void> {
    userDto.placeParking = null;
    await this.userRepository.save(userDto);
  }

  async findPlace(userDto: UserDto): Promise<PlaceParkingDto> {
    return userDto.placeParking;
  }
}
