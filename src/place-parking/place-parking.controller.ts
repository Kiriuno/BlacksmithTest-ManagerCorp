import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaceParkingService } from './place-parking.service';
import { PlaceParkingDto } from './dto/place-parking.dto';
import { Observable } from 'rxjs';
import { PlaceParking } from './entities/place-parking.entity';
import { PlaceParkingI } from './place-parking.interface';

@Controller('place-parking')
export class PlaceParkingController {
  constructor(private readonly placeParkingService: PlaceParkingService) {}

  @Post()
  create(@Body() placeParkingDto: PlaceParkingDto): Promise<PlaceParking> {
    return this.placeParkingService.create(placeParkingDto);
  }

  @Get()
  findFree(): Observable<PlaceParkingI> {
    return this.placeParkingService.findFree();
  }
}
