import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ComplainService } from './complain.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateComplainDto } from './dto/complain-create.dto';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { userEnum } from 'src/shared/enums';
import {
  ComplainCreateAnswer,
  ComplainUpdateReadStatus,
} from './dto/complain-update.dto';

@Controller('complain')
export class ComplainController {
  constructor(private readonly service: ComplainService) {}

  @Post()
  @UseGuards(AuthGuard('user'))
  create(@Body() dto: CreateComplainDto, @Req() req: any) {
    return this.service.create(dto, req.user);
  }

  @Get('not-read-count')
  @UseGuards(AuthGuard('user'))
  getNotReadCount(@Req() req: any) {
    return this.service.getNotReadCount(req.user);
  }

  @Get('@me')
  @UseGuards(AuthGuard('user'))
  getComplains(@Req() req: any) {
    return this.service.getComplains(req.user);
  }

  @Post('answer')
  @UseGuards(AuthGuard('user'), RolesGuard)
  @Roles(userEnum.Role.Company)
  createAnswer(@Body() dto: ComplainCreateAnswer) {
    return this.service.answerComplain(dto);
  }

  @Post('read')
  changeToRead(@Body() dto: ComplainUpdateReadStatus) {
    return this.service.changeToRead(dto);
  }
}
