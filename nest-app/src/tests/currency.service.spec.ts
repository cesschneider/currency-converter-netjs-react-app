import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from '../api.service';
import { CurrencyService } from '../currency.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

class ApiServiceMock {
  async getQuoteForPair(inputCurrency: string, outputCurrency: string) {
    if (inputCurrency == 'USD' && outputCurrency == 'EUR')
      return {
        pair: 'USD_EUR',
        quote: 1.2,
      };
    if (inputCurrency == 'USD' && outputCurrency == 'GBP')
      return {
        pair: 'USD_GBP',
        quote: undefined,
      };
    if (inputCurrency == 'AAA' && outputCurrency == 'BBB')
      return {
        pair: 'AAA_BBB',
        quote: undefined,
      };
  }
}

describe('CurrencyService', () => {
  let app: TestingModule;
  let currencyService: CurrencyService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiService,
      useClass: ApiServiceMock,
    };
    app = await Test.createTestingModule({
      providers: [CurrencyService, ApiServiceProvider],
    }).compile();
    currencyService = app.get<CurrencyService>(CurrencyService);
  });

  describe('getQuote', () => {
    it('should get quote for existing pair', async () => {
      const expectedQuote = 1.2;
      const quote = await currencyService.getQuote('USD', 'EUR');

      expect(quote).toEqual(expectedQuote);
    });
    it('throws error if currency does not have quotes available', async () => {
      expect.assertions(1);
      try {
        await currencyService.getQuote('EUR', 'GBP');
      } catch (e) {
        expect(e.message).toBe("TypeError: Cannot read property 'quote' of undefined");
      }
    });
    it('throws error if API cannot find the currency pair', async () => {
      try {
        await currencyService.getQuote('AAA', 'BBB');
      } catch (e) {
        expect(e.message).toBe('Error: Cannot find currency pair');
      }
    });
  });
});
