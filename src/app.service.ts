import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getAuthor(): object {
    return { author: 'Ross' };
  }
}
