import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IJwtPayload } from 'src/shared/interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ILoginResponse } from 'src/shared/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(dto: UserCreateDto): Promise<User> {
    try {
      const user = await this.repo.save({
        ...dto,
      });
      user.password = undefined;

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.repo.findOneBy({ id });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(dto: UserLoginDto): Promise<ILoginResponse> {
    try {
      const user = await this.repo.findOne({
        where: {
          mail: dto.mail,
        },
      });

      if (user.password !== dto.password) {
        throw new HttpException('Password is wrong', HttpStatus.FORBIDDEN);
      }

      const jwtPayload: IJwtPayload = {
        id: user.id,
        mail: user.mail,
      };

      const token = await this.jwtService.signAsync(jwtPayload, {
        algorithm: 'HS256',
        secret: this.configService.get<string>('jwtSecret'),
      });

      delete user.password;

      return {
        user,
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}
