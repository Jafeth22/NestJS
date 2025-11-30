import { Test, TestingModule } from '@nestjs/testing';
import { AlgoService } from './algo.service';

describe('AlgoService', () => {
  let service: AlgoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlgoService],
    }).compile();

    service = module.get<AlgoService>(AlgoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
