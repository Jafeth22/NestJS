import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { NotFoundException } from '@nestjs/common';

describe('QuoteService', () => {
  let service: QuoteService;

  const testQuote = {
    id: 1,
    quote:
      'Testing is not responsible for the bugs inserted into software any more than the sun is responsible for creating dust in the air.',
    from: 'Dorothy Graham',
  };

  const mockRepository = {
    find: jest.fn(() => [testQuote]),
    findOneBy: jest.fn(async ({ id }: { id: number }) => {
      if (id !== testQuote.id) throw new NotFoundException();
      return Promise.resolve(testQuote);
    }),
    remove: jest.fn((quote) => quote),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        // Provide a mock repository, this is because we are only testing the service
        // not the repository itself, which is part of TypeORM and has its own tests
        // in case we need to test the repository, we can do it in an e2e test
        // or use a real database connection in the tests
        {
          provide: getRepositoryToken(Quote),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe.skip('create', () => {});

  describe('findAll', () => {
    it('should return an array of quotes', () => {
      expect(service.findAll()).toEqual([testQuote]);
    });
  });

  describe('findOne', () => {
    it('should return a quote if given a valid id', async () => {
      expect(await service.findOne(testQuote.id)).toEqual(testQuote);
    });

    it('should throw NotFoundException if given an invalid id', async () => {
      try {
        await service.findOne(Date.now());
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe.skip('update', () => {});

  describe('remove', () => {
    it('should return a quote if given a valid id', async () => {
      expect(await service.remove(testQuote.id)).toEqual(testQuote);
    });

    it('should throw NotFoundException if given an invalid id', async () => {
      try {
        await service.remove(Date.now());
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
