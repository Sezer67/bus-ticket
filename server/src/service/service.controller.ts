import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { userEnum } from 'src/shared/enums';
import { Request } from 'express';
import { ServiceLookupDto, TravelLookupDto } from './dto/service-lookup.dto';
import { ServiceBuyTicketDto } from './dto/service-ticket-buy.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  @Get('/find')
  @UseGuards(AuthGuard('user'))
  lookup(@Query() dto: ServiceLookupDto) {
    return this.service.lookup(dto);
  }

  @Post('/')
  @UseGuards(AuthGuard('user'), RolesGuard)
  @Roles(userEnum.Role.Company)
  createService(@Body() dto: any, @Req() req: Request) {
    return this.service.createService(dto, req);
  }

  @Post('/ticket-buy')
  @UseGuards(AuthGuard('user'), RolesGuard)
  @Roles(userEnum.Role.Customer)
  buyTicket(@Body() dto: ServiceBuyTicketDto, @Req() req: any) {
    return this.service.buyTicket(dto, req.user);
  }

  @Get('travels/@me')
  @UseGuards(AuthGuard('user'),RolesGuard)
  @Roles(userEnum.Role.Customer)
  getTravelsMe(@Query() dto: TravelLookupDto, @Req() req:any){
    return this.service.getTravelsMe(dto,req.user);
  }
}
