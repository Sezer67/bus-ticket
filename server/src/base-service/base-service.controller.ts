import { Controller, UseGuards, Post, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/shared/decorators/role.decorator';
import { userEnum } from 'src/shared/enums';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { BaseServiceService } from './base-service.service';
import { CreateBaseServiceDto } from './dto/create-base-service.dto';

@Controller('base-service')
@UseGuards(AuthGuard('user'), RolesGuard)
@Roles(userEnum.Role.Company)
export class BaseServiceController {
  constructor(private readonly service: BaseServiceService) {}

  @Post()
  create(@Body() dto: CreateBaseServiceDto, @Req() req: any) {
    return this.service.create(dto, req.user);
  }
}
