import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { userEnum } from 'src/shared/enums';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('register')
  createUser(@Body() dto: UserCreateDto) {
    return this.service.createUser(dto);
  }

  @Get('/deneme')
  @UseGuards(AuthGuard('user'), RolesGuard)
  @Roles(userEnum.Role.Customer)
  deneme(@Req() req: Request) {
    return req.user;
  }
}
