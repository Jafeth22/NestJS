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
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from '../src/quote/entities/quote.entity';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from '../src/common/guards/api-key.guard';
import { QuoteModule } from '../src/quote/quote.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  const testQuote = {
    quote: 'Testers discover the unknown.',
    from: 'Angie Jones',
  };
  const updatedQuote =
    'Without human intuitive exploration, a team may be blind to their most expensive bugs.'; // also from Angie Jones

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          // test database connection
          type: 'postgres',
          username: 'postgres',
          password: 'root',
          host: 'localhost',
          port: 5432,
          database: 'quoteapi_test',
          entities: ['../src/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: false,
        }),
        QuoteModule,
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

  afterAll(async () => {
    // close db connection
    await app.close();
  });

  describe('/quote routes', () => {
    let id: number;

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

    describe('POST /quote', () => {
      it('should return a saved quote', () => {
        return request(app.getHttpServer())
          .post('/quote')
          .set('Authorization', `${process.env.API_KEY}`)
          .send({ quote: testQuote.quote, from: testQuote.from })
          .expect(201)
          .then((response) => {
            id = response.body.id;
            const { quote, from } = response.body;
            expect(typeof id).toBe('number');
            expect(quote).toBe(testQuote.quote);
            expect(from).toBe(testQuote.from);
          });
      });
    });

    describe('GET /quote', () => {
      it('should return an array of quotes', () => {
        return request(app.getHttpServer())
          .get('/quote')
          .set('Authorization', `${process.env.API_KEY}`)
          .expect(200)
          .then((response) => {
            expect(Array.isArray(response.body)).toBe(true);
            for (const { quote, from } of response.body) {
              expect(quote).toBe(testQuote.quote);
              expect(from).toBe(testQuote.from);
            }
          });
      });
    });

    describe('GET /quote/:id', () => {
      it('should return a quote given valid id', () => {
        return request(app.getHttpServer())
          .get(`/quote/${id}`)
          .set('Authorization', `${process.env.API_KEY}`)
          .expect(200)
          .expect({ id, ...testQuote });
      });

      it('should throw a NotFoundException given invalid id', async () => {
        try {
          await request(app.getHttpServer())
            .get(`/quote/${id + 1}`)
            .set('Authorization', `${process.env.API_KEY}`);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('PATCH /quote/:id', () => {
      it('should return an updated quote given valid id', () => {
        return request(app.getHttpServer())
          .patch(`/quote/${id}`)
          .set('Authorization', `${process.env.API_KEY}`)
          .send({ quote: updatedQuote })
          .expect(200)
          .expect({ id, quote: updatedQuote, from: testQuote.from });
      });

      it('should throw a NotFoundException given invalid id', async () => {
        try {
          await request(app.getHttpServer())
            .patch(`/quote/${id + 1}`)
            .set('Authorization', `${process.env.API_KEY}`)
            .send({ quote: updatedQuote });
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });

    describe('DELETE /quote/:id', () => {
      it('should return a removed quote given valid id', () => {
        return request(app.getHttpServer())
          .delete(`/quote/${id}`)
          .set('Authorization', `${process.env.API_KEY}`)
          .expect(200)
          .expect({ quote: updatedQuote, from: testQuote.from });
      });

      it('should throw a NotFoundException given invalid id', async () => {
        try {
          await request(app.getHttpServer())
            .patch(`/quote/${id + 1}`)
            .set('Authorization', `${process.env.API_KEY}`);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
    });
  });
});
