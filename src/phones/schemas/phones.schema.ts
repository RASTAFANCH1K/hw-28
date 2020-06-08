import * as mongoose from 'mongoose';

export const phoneSchema: any = new mongoose.Schema({
  name: String,
  description: String,
  imgPath: String,
});