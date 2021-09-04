import { Module } from '@nestjs/common';
import { PlaceParkingService } from './place-parking.service';
import { PlaceParkingController } from './place-parking.controller';
import { PlaceParking } from './entities/place-parking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PlaceParkingController],
  providers: [PlaceParkingService],
  imports: [TypeOrmModule.forFeature([PlaceParking])]
})
export class PlaceParkingModule {}
