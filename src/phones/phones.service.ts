import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { phoneModelToken } from './tokens/phones.model-token';
import { Model } from 'mongoose';
import { IPhone } from './interfaces/phones.interface';

@Injectable()
export class PhoneService {
  constructor(@Inject(phoneModelToken) private readonly phoneModel: Model<IPhone>) {}

  public addPhone(phone: IPhone) {
    return this.phoneModel.create(phone);
  }

  public async getPhoneById(id: string) {
    const phone = await this.phoneModel.findOne( { _id: id } ).lean().exec();

    if (!phone) throw new BadRequestException(`Phone with following id: ${id} does not exist`);
    
    return phone;
  }

  public getAllPhones() {
    return this.phoneModel.find().lean().exec();
  }

  public async uploadPhoneImg(id: string, ImgUrl: string) {
    const phone = await this.phoneModel.findOne({_id: id}).lean().exec();
    
    if (!phone) throw new BadRequestException(`Phone with following id: ${id} does not exist`);
  
    return this.phoneModel.updateOne({...phone}, {$set: {imgPath: ImgUrl}}); // updateMany, update 
  }
}
