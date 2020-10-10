import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { INestApplication, HttpService, HttpModule } from '@nestjs/common';
import { ApiService } from '../api.service';
import { CurrencyService } from '../currency.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [ApiService, CurrencyService],
    }).compile();

    app = mockAppModule.createNestApplication();
    httpService = mockAppModule.get<HttpService>(HttpService);
    await app.init();
  });

  it('GET currency quote if API finds the currency pair', async () => {
    const result: AxiosResponse = {
      data: {
        pair: 'USD_EUR',
        quote: 1.2,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    const expectedQuoteString = "1.2";
    const response = await request(app.getHttpServer())
      .get('/currency/quote?inputCurrency=USD&outputCurrency=EUR')
      .expect(200);
    expect(response.text).toEqual(expectedQuoteString);
  });

  it('throws error if GET request does not include currency symbols', async () => {
    return await request(app.getHttpServer())
      .get('/currency/quote?inputCurrency=&outputCurrency=')
      .expect(400);
  });

  it('throws error if currency does not have quotes available', async () => {
    const result: AxiosResponse = {
      data: { 
        pair: 'USD_GBP', 
        quote: undefined
      },
      status: 400,
      statusText: '',
      headers: {},
      config: {},
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

    return await request(app.getHttpServer())
      .get('/currency/quote?inputCurrency=USD&outputCurrency=GBP')
      .expect(400);
  });

  it('throws error if API cannot find the currency pair', async () => {
    const result: AxiosResponse = {
      data: {
        pair: 'AAA_BBB',
        quote: undefined
      },
      status: 404,
      statusText: '',
      headers: {},
      config: {},
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

    return await request(app.getHttpServer())
      .get('/currency/quote?inputCurrency=AAA&outputCurrency=BBB')
      .expect(404);
  });

  it('throws error if currency conversion API is not avaiable', async () => {
    const result: AxiosResponse = {
      data: {
        pair: 'AAA_BBB',
        quote: undefined
      },
      status: 500,
      statusText: '',
      headers: {},
      config: {},
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

    return await request(app.getHttpServer())
      .get('/currency/quote?inputCurrency=AAA&outputCurrency=BBB')
      .expect(500);
  });
});
