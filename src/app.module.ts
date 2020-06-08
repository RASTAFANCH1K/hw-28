import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PhoneModule } from './phones/phones.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ ConfigModule, PhoneModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
