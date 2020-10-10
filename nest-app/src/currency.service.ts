import { Injectable, HttpException } from '@nestjs/common';
import { ApiService } from './api.service';

interface Currency {
  pair: string;
  quote: number;
}

@Injectable()
export class CurrencyService {
  constructor(private apiService: ApiService) {}

  public async getQuote(inputCurrency: string, outputCurrency: string): Promise<number> {

    try {
      const quoteForPair: Currency = await this.apiService.getQuoteForPair(
        inputCurrency,
        outputCurrency,
      );
  
      if (quoteForPair.quote === null) {
        throw new HttpException('Cannot find quote for currency pair', 400);
      }
  
      if ('quote' in quoteForPair === false || quoteForPair.quote === undefined) {
        throw new HttpException('Cannot find currency pair', 404);
      }
  
      const quote: number = quoteForPair.quote;
      return quote;
    }
    catch (e) {
      throw new HttpException(e, 500);
    }
  }
}
