import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { PlaceParkingDto } from './dto/place-parking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceParking } from './entities/place-parking.entity';
import { Repository } from 'typeorm';
import { PlaceParkingI } from './place-parking.interface';

@Injectable()
export class PlaceParkingService {
  constructor(
    @InjectRepository(PlaceParking)
    private placeParkingRepository: Repository<PlaceParking>
  ) {}

  create(placeParkingDto: PlaceParkingDto): Promise<PlaceParking> {
    return this.placeParkingRepository.save(placeParkingDto);
  }

  findFree(): Observable<PlaceParkingI> {
    const disponible = true;
    return from(this.placeParkingRepository.findOne({disponible}, {select: ['num', 'etage', 'disponible', 'tpsOccupation']}));
  }
}