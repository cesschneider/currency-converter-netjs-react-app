import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { CurrencyService } from './currency.service';
import { ApiService } from './api.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [ApiService, CurrencyService],
})
export class AppModule {}
