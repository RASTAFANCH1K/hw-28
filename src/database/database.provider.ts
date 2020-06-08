import { databaseConnectionToken } from './tokens/database.connection-token';
import { ConfigService } from 'src/config/config.service';
import * as mongoose from 'mongoose';

export const databaseProvider: any = [
  {
    provide: databaseConnectionToken,
    useFactory: async (config: ConfigService): Promise<any> => {
      (mongoose as any).Promise = global.Promise;
      const dbConnection: any = mongoose.connection;
      const host: string = config.get('MONGO_DB_HOST');
      const connectionConfig: { autoIndex: boolean, useCreateIndex: boolean } = {
        autoIndex: true,
        useCreateIndex: true,
      };

      await mongoose.connect(host, {config: connectionConfig});

      return dbConnection;
    },
    inject: [ConfigService],
  },
];