import { Injectable, HttpService, HttpException } from '@nestjs/common';

// TODO: move API key to environment variable
const CURRCONV_API_KEY = "fdfac79ec7915d28e006";

interface Currency {
  pair: string;
  quote: number;
}

@Injectable()
export class ApiService {
  constructor(private http: HttpService) {}
  async getQuoteForPair(inputCurrency: string, outputCurrency: string): Promise<Currency> {
    const url = `https://free.currconv.com/api/v7/convert?q=${inputCurrency}_${outputCurrency}&compact=ultra&apiKey=${CURRCONV_API_KEY}`;

    try {
      const response = await this.http.get(url).toPromise();
      const currency: Currency = {
        pair: `${inputCurrency}_${outputCurrency}`,
        quote: response.data[`${inputCurrency}_${outputCurrency}`]
      }
      console.log(currency);
      return currency;
    }
    catch (e) {
      throw new HttpException('Conversion service not available', 500);
    }
  }
}
