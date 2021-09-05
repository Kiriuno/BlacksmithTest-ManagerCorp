import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlaceParkingService } from './place-parking.service';
import { PlaceParkingDto } from './dto/place-parking.dto';
import { Observable } from 'rxjs';
import { PlaceParking } from './entities/place-parking.entity';
import { PlaceParkingI } from './place-parking.interface';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('place-parking')
export class PlaceParkingController {
  constructor(private readonly placeParkingService: PlaceParkingService) {}

  @Post()
  create(@Body() placeParkingDto: PlaceParkingDto, userDto: UserDto): Promise<PlaceParking> {
    return this.placeParkingService.create(placeParkingDto, userDto);
  }

  @Get()
  findFree(@Body() etage: number): Observable<PlaceParkingI> {
    return this.placeParkingService.findFree(etage);
  }
}
