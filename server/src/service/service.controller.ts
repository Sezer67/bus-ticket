import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { userEnum } from 'src/shared/enums';
import { Request } from 'express';
import { ServiceCreateDto } from './dto/service-create.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  @Get('/')
  lookup() {
    return this.service.lookup();
  }

  @Post('/')
  @UseGuards(AuthGuard('user'), RolesGuard)
  @Roles(userEnum.Role.Company)
  createService(@Body() dto: any, @Req() req: Request) {
    return this.service.createService(dto, req);
  }
}
