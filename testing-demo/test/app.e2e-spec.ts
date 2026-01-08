import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    // createTestingModule = it recreates the entire app module for testing
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // import the AppModule which contains all controllers and providers
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/test (GET)', () => {
    return request(app.getHttpServer()) // make a request to the app's HTTP server
      .get('/test')
      .expect(200)
      .expect('This is only a test.');
  });
});
