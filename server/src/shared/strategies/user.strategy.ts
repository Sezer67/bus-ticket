import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from '../interfaces/jwt.interface';
import { isDefined } from 'class-validator';
import { User } from 'src/user/user.entity';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: configService.get<string>('jwtSecret'),
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const user = await this.userService.getUserById(payload.id);

    if (!isDefined(user)) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
