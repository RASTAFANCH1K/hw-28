import { phoneModelToken } from '../tokens/phones.model-token';
import { Connection, Model, Document } from 'mongoose';
import { phoneSchema } from '../schemas/phones.schema';
import { databaseConnectionToken } from '../../database/tokens/database.connection-token';

export const phoneProvider: any = {
  provide: phoneModelToken,
  useFactory: (connection: Connection): Model<Document> => connection.model('phonemodels', phoneSchema),
  inject: [ databaseConnectionToken ],
}