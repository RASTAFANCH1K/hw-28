import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PhoneController } from './phones.controller';
import { phoneProviderToken } from './tokens/phones.provider-token';
import { PhoneService } from './phones.service';
import { phoneProvider } from './providers/phones.provider';

@Module({
  imports: [ DatabaseModule ],
  controllers: [ PhoneController ],
  providers: [
    {
      provide: phoneProviderToken,
      useClass: PhoneService,
    }, 
    phoneProvider,
  ],
})
export class PhoneModule {}