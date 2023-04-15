import {
  Controller,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
  Param,
  UseGuards,
  Body,
  Req,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/shared/file.functions';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { CompanyCreateDto } from './dto/company-create.dto';
import { Roles } from 'src/shared/decorators/role.decorator';
import { userEnum } from 'src/shared/enums';
import { CompanyUpdateDto } from './dto/company-update.dto';
import { CompanyLookupDto } from './dto/company-lookup.dto';

@Controller('company')
@UseGuards(AuthGuard('user'), RolesGuard)
@Roles(userEnum.Role.Company)
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Get('/')
  @Roles(userEnum.Role.Customer,userEnum.Role.Company)
  lookup(@Query() dto: CompanyLookupDto) {
    return this.service.lookup(dto);
  }

  @Post('')
  createCompany(@Body() dto: CompanyCreateDto, @Req() req: Request) {
    return this.service.createCompany(dto, req);
  }

  @Put('')
  updateCompany(@Body() dto: CompanyUpdateDto, @Req() req: Request) {
    return this.service.updateCompany(dto, req);
  }

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
