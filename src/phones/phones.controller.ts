import { Controller, Inject, Get, Param, Post, Body, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { phoneProviderToken } from './tokens/phones.provider-token';
import { PhoneService } from './phones.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { editFileName, imageFileFilter } from './nest-file-uploading/file-upload.utils';
import { IPhone } from './interfaces/phones.interface';

@Controller('phones') 
export class PhoneController {
  public SERVER_URL: string  =  "http://localhost:3000/";

  constructor(@Inject(phoneProviderToken) public phoneService: PhoneService) {}

  @Post('addTestPhoneImg') // http://localhost:3000/phones/addTestPhoneImg
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './test',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )

  public uploadTestPhoneImg(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Get('test/:id') // http://localhost:3000/phones/test/id
  public seeUploadedTestPhoneImg(@Param('id') id, @Res() res) {
    return res.sendFile(id, { root: './test' });
  }

  @Post('addPhone') // http://localhost:3000/phones/addPhone
  public addPhone(@Body() body: IPhone ) {
    return this.phoneService.addPhone(body);
  }

  @Get(':id') // http://localhost:3000/phones/id
  public getPhoneById(@Param() data: { id: string } ) {
    return this.phoneService.getPhoneById(data.id);
  }

  @Get() // http://localhost:3000/phones
  public getAllPhones() {
    return this.phoneService.getAllPhones();
  }

  @Post(':id/addPhoneImg') // http://localhost:3000/phones/id/addPhoneImg
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './phone-images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )

  public uploadPhoneImg(@Param('id') id: string, @UploadedFile() file) {
    return this.phoneService.uploadPhoneImg(id, `${this.SERVER_URL}${file.path}`);
  }

  @Get('phone-images/:id') // http://localhost:3000/phones/phone-images/id
  public seeUploadedFile(@Param('id') id, @Res() res) {
    return res.sendFile(id, { root: './phone-images' });
  }
}