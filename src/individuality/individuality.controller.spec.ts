import { Test, TestingModule } from '@nestjs/testing';
import { IndividualityController } from './individuality.controller';

describe('Individuality Controller', () => {
  let controller: IndividualityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndividualityController],
    }).compile();

    controller = module.get<IndividualityController>(IndividualityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
