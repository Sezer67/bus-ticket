import { Body, Post, Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ILoginResponse } from 'src/shared/interfaces/user.interface';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: UserService) {}

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<ILoginResponse> {
    return this.service.login(dto);
  }
}
