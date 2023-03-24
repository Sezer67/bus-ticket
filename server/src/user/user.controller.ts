import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { userEnum } from 'src/shared/enums';
import { User } from './user.entity';
import { ChangePasswordDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('@me')
  @UseGuards(AuthGuard('user'))
  currentUser(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  createUser(@Body() dto: UserCreateDto) {
    return this.service.createUser(dto);
  }

  @Put('/change-password')
  @UseGuards(AuthGuard('user'))
  changePass(@Body() dto: ChangePasswordDto, @Req() req: any) {
    return this.service.changePass(dto, req.user);
  }

  @Put('/')
  @UseGuards(AuthGuard('user'))
  updateUser(@Body() dto: any, @Req() request: Request) {
    console.log();
  }

  @Post('/buy-ticket')
  @UseGuards(AuthGuard('user'), RolesGuard)
  @Roles(userEnum.Role.Company)
  buyTicket(@Body() dto: any, @Req() req: Request) {
    return this.service.buyTicket(dto, req.user as User);
  }
}
