import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserStrategy } from 'src/shared/strategies/user.strategy';
import { Company } from 'src/company/company.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Company]), JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, JwtService, UserStrategy],
  exports: [JwtModule, UserService],
})
export class UserModule {}
