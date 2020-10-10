import { Controller, Get, Query, HttpException } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class AppController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/quote')
  async getQuoteForPair(
    @Query('inputCurrency') inputCurrency: string,
    @Query('outputCurrency') outputCurrency: string,
  ): Promise<number> {
    if (!inputCurrency || !outputCurrency) {
      throw new HttpException('Incomplete currency information', 400);
    }
    return await this.currencyService.getQuote(inputCurrency, outputCurrency);
  }
}
