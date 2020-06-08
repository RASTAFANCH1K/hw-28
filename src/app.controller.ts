import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('author') // http://localhost:3000/author
  public getAuthor(): object {
    return this.appService.getAuthor();
  }
}
