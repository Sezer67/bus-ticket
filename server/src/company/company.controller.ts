import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/shared/file.functions';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Post('/upload-logo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './images/company',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadLogo(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const response = {
      originalName: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Get(':path')
  getFile(@Param('path') path: string, @Res() res: Response) {
    return res.sendFile(path, { root: './images/company' });
  }
}
