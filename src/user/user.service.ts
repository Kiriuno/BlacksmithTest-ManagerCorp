import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserI } from './user.interface';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
    private userService: UserService
  ) {}

  create(createUserDto: UserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  // login(loginUserDto: LoginUserDto): Observable<string> {
  //   return this.findByName(loginUserDto.name).pipe(
  //     switchMap((user: UserI) => this.validatePassword(loginUserDto.password, user.password).pipe(
  //       map((passwordsMatches: boolean) => {
  //         if(passwordsMatches){
  //           return 'Login successfull'
  //         } else {
  //           throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED)
  //         }
  //       })
  //     ))
  //   )
  // }

  async login(loginUserDto: LoginUserDto): Promise<any>{
    const user = await this.userService.findOne(loginUserDto.name);
    if(user && user.password == loginUserDto.password){
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UserDto): Promise<void> {
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  private validatePassword(password: string, storedPasswordHash: string): Observable<boolean> {
    return this.authService.comparePassword(password, storedPasswordHash)
  }

  private findByName(name: string): Observable<UserI> {
    return from(this.userRepository.findOne({name}, {select: ['id', 'name', 'password', 'isAdmin']}));
  }
}
