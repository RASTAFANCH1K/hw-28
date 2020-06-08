import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { databaseProvider } from './database.provider';

@Module({
  imports: [ ConfigModule ],
  providers: [ ...databaseProvider ],
  exports: [ ...databaseProvider ]
})
export class DatabaseModule {}