import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('ArticleController e2e test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new article', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'liliya@gmail.com',
        password: '123456',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.accessToken).toBeDefined();

    return request(app.getHttpServer())
      .post('/article')
      .set('Authorization', 'Bearer ' + response.body.accessToken)
      .send({ content: 'sdy' })
      .expect(200);
  });
});
