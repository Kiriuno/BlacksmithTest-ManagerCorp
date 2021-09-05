import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { PlaceParkingDto } from './dto/place-parking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceParking } from './entities/place-parking.entity';
import { Repository } from 'typeorm';
import { PlaceParkingI } from './place-parking.interface';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class PlaceParkingService {
  constructor(
    @InjectRepository(PlaceParking)
    private placeParkingRepository: Repository<PlaceParking>,
  ) {}

  create(placeParkingDto: PlaceParkingDto, userDto: UserDto): Promise<PlaceParking | null> {
    if(userDto.isAdmin){
      return this.placeParkingRepository.save(placeParkingDto);
    }else{
      return null
    }
  }

  findFree(etage: number): Observable<PlaceParkingI> {
    const disponible = true;
    return from(this.placeParkingRepository.findOne({etage, disponible}, {select: ['num', 'etage', 'disponible', 'tpsOccupation', 'user']}));
  }
}