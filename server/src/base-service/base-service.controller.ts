import {
  Controller,
  UseGuards,
  Post,
  Body,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/shared/decorators/role.decorator';
import { userEnum } from 'src/shared/enums';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { BaseServiceService } from './base-service.service';
import { CreateBaseServiceDto } from './dto/create-base-service.dto';
import { BaseServiceLookupDto } from './dto/lookup.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('base-service')
@UseGuards(AuthGuard('user'), RolesGuard)
@Roles(userEnum.Role.Company)
export class BaseServiceController {
  constructor(private readonly service: BaseServiceService) {}

  @Post()
  create(@Body() dto: CreateBaseServiceDto, @Req() req: any) {
    return this.service.create(dto, req.user);
  }

  @Get('@me')
  lookup(@Query() dto: BaseServiceLookupDto, @Req() req: any) {
    return this.service.lookup(dto, req.user);
  }

  @Get('sad')
  get(@Req() req: any) {
    return this.service.get(req.user);
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  checkCompletedService() {
    this.service.checkCompletedService();
  }
}
