import { Test, TestingModule } from '@nestjs/testing';
import { PlaceParkingController } from './place-parking.controller';
import { PlaceParkingService } from './place-parking.service';

describe('PlaceParkingController', () => {
  let controller: PlaceParkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceParkingController],
      providers: [PlaceParkingService],
    }).compile();

    controller = module.get<PlaceParkingController>(PlaceParkingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
