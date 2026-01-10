import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

describe('QuoteController', () => {
  let controller: QuoteController;

  const testQuote = {
    quote: 'The earlier a bug is found, the cheaper it is to fix.',
    from: 'Karen N. Johnson',
  };

  const mockQuoteService = {
    create: jest.fn((createQuoteDto: CreateQuoteDto) => ({
      id: Date.now(),
      ...createQuoteDto,
    })),
    update: jest.fn((id: number, updateQuoteDto: UpdateQuoteDto) => ({
      id,
      ...testQuote,
      ...updateQuoteDto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      // Provide a mock service, this is because we are only testing the controller,
      // not the service itself, which has its own tests
      providers: [{ provide: QuoteService, useValue: mockQuoteService }],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a quote', () => {
      expect(controller.create(testQuote)).toEqual({
        id: expect.any(Number),
        ...testQuote,
      });
    });
  });

  describe.skip('findAll', () => {});

  describe.skip('findOne', () => {});

  describe('update', () => {
    it('should update a quote', () => {
      const id = Date.now();
      const newQuote = {
        quote:
          'Talk with the programmers instead of writing bug reports. You will save time.',
        from: 'Janet Gregory',
      };

      expect(controller.update(id, newQuote)).toEqual({ id, ...newQuote });
    });
  });

  describe.skip('remove', () => {});
});
