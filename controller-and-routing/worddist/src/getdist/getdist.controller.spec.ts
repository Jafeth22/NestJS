import { Test, TestingModule } from '@nestjs/testing';
import { GetdistController } from './getdist.controller';

describe('GetdistController', () => {
  let controller: GetdistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetdistController],
    }).compile();

    controller = module.get<GetdistController>(GetdistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
