import { Test, TestingModule } from '@nestjs/testing';
import { PlaceParkingService } from './place-parking.service';

describe('PlaceParkingService', () => {
  let service: PlaceParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceParkingService],
    }).compile();

    service = module.get<PlaceParkingService>(PlaceParkingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
