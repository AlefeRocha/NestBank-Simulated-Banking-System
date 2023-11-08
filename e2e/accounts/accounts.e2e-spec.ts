import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AccountsModule } from '../../src/accounts/accounts.module';
import { CoreModule } from '../../src/core/core.module';

describe('Accounts', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AccountsModule, CoreModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET accounts`, () => {
    return request(app.getHttpServer()).get('/accounts').expect(200).expect({
      data: [{id: 1, balance: 91}, {id: 2, balance: 1850}],
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
