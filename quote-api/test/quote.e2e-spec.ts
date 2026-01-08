import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { QuoteController } from '../src/quote/quote.controller';
import { QuoteService } from '../src/quote/quote.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quote } from '../src/quote/entities/quote.entity';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from '../src/common/guards/api-key.guard';

describe('QuoteController (e2e)', () => {
  let app: INestApplication<App>;

  const testQuote = {
    id: 1,
    quote: 'Testers discover the unknown.',
    from: 'Angie Jones',
  };

  const mockRepository = {
    find: jest.fn(() => [testQuote]),
    findOneBy: jest.fn(async ({ id }: { id: number }) => {
      if (id !== testQuote.id) throw new NotFoundException();
      return Promise.resolve(testQuote);
    }),
    create: jest.fn(() => testQuote),
    remove: jest.fn((id: number) => testQuote),
    save: jest.fn((quote) => quote),
    preload: jest.fn(async (quote) => {
      if (quote.id !== testQuote.id) throw new NotFoundException();
      return Promise.resolve({ ...testQuote, ...quote });
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()], // ConfigModule.forRoot() to access environment variables
      controllers: [QuoteController], // Include the QuoteController
      providers: [
        // Include the QuoteService
        QuoteService,
        // Mock the Quote repository
        {
          provide: getRepositoryToken(Quote),
          useValue: mockRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalGuards(new ApiKeyGuard());
    await app.init();
  });

  describe('/quote routes', () => {
    describe('Unauthorized', () => {
      it('should throw 403 Forbidden with missing Authorization header', () => {
        return request(app.getHttpServer()).get('/quote').expect(403);
      });

      it('should throw 403 Forbidden with invalid Authorization header', () => {
        return request(app.getHttpServer())
          .get('/quote')
          .set('Authorization', `invalid${Date.now()}`)
          .expect(403);
      });
    });

    describe('GET /quote', () => {
      it('should return an array of quotes', () => {
        return request(app.getHttpServer())
          .get('/quote')
          .set('Authorization', `${process.env.API_KEY}`)
          .expect(200)
          .expect([testQuote]);
      });
    });

    describe('POST /quote', () => {
      it('should return a saved quote', () => {
        return request(app.getHttpServer())
          .post('/quote')
          .set('Authorization', `${process.env.API_KEY}`)
          .send({ quote: testQuote.quote, from: testQuote.from })
          .expect(201)
          .expect(testQuote);
      });
    });

    describe('GET /quote/:id', () => {
      it('should return a quote if given valid id', () => {
        return request(app.getHttpServer())
          .get(`/quote/${testQuote.id}`)
          .set('Authorization', `${process.env.API_KEY}`)
          .expect(200)
          .expect(testQuote);
      });

      it('should throw a NotFoundException if given invalid id', async () => {
        try {
          await request(app.getHttpServer())
            .get(`/quote/${testQuote.id}`)
            .set('Authorization', `${process.env.API_KEY}`);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('PATCH /quote/:id', () => {
      const updatedQuote =
        'Without human intuitive exploration, a team may be blind to their most expensive bugs.'; // also from Angie Jones

      it('should return an updated quote if given valid id', () => {
        return request(app.getHttpServer())
          .patch(`/quote/${testQuote.id}`)
          .set('Authorization', `${process.env.API_KEY}`)
          .send({ quote: updatedQuote })
          .expect(200)
          .expect({ ...testQuote, quote: updatedQuote });
      });

      it('should throw a NotFoundException if given invalid id', async () => {
        try {
          await request(app.getHttpServer())
            .patch(`/quote/${testQuote.id}`)
            .set('Authorization', `${process.env.API_KEY}`)
            .send({ quote: updatedQuote });
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('DELETE /quote/:id', () => {
      it('should return a removed quote if given valid id', () => {
        return request(app.getHttpServer())
          .delete(`/quote/${testQuote.id}`)
          .set('Authorization', `${process.env.API_KEY}`)
          .expect(200)
          .expect(testQuote);
      });

      it('should throw a NotFoundException if given invalid id', async () => {
        try {
          await request(app.getHttpServer())
            .delete(`/quote/${testQuote.id}`)
            .set('Authorization', `${process.env.API_KEY}`);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
