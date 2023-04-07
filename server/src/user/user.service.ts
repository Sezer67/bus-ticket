import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { IJwtPayload } from 'src/shared/interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ILoginResponse } from 'src/shared/interfaces/user.interface';
import { ServicesOfUsers } from 'src/services-of-users/services-of-users.entity';
import { ChangePasswordDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    @InjectRepository(ServicesOfUsers)
    private readonly servicesOfUserRepo: Repository<ServicesOfUsers>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(dto: UserCreateDto): Promise<ILoginResponse> {
    try {
      const user = await this.repo.save({
        ...dto,
      });
      user.password = undefined;
      const jwtPayload: IJwtPayload = {
        id: user.id,
        mail: user.mail,
      };

      const token = await this.jwtService.signAsync(jwtPayload, {
        algorithm: 'HS256',
        secret: this.configService.get<string>('jwtSecret'),
      });
      return { user, token };
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
      
      if(!user){
        throw new HttpException('mail is not found',400);
      }
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

  async changePass(dto: ChangePasswordDto, user: User) {
    try {
      if (user.password !== dto.currentPassword) {
        throw new HttpException('Password is wrong', HttpStatus.FORBIDDEN);
      }
      await this.repo.update({ id: user.id }, { password: dto.newPassword });
    } catch (error) {
      throw error;
    }
  }

  async buyTicket(dto: any, user: User) {
    try {
      // error
      const serviceOfUser = this.servicesOfUserRepo.create({
        userId: user.id,
        seatNumber: 10,
        serviceId: '0dc132ce-4614-4fee-ad1b-35679de9707a',
      });
      return await serviceOfUser.save();
    } catch (error) {
      throw error;
    }
  }
}
