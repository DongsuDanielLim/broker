import { Test, TestingModule } from '@nestjs/testing';
import { IndividualityService } from './individuality.service';

describe('IndividualityService', () => {
  let service: IndividualityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndividualityService],
    }).compile();

    service = module.get<IndividualityService>(IndividualityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
