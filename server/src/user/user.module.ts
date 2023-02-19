import { Module, Global, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserStrategy } from 'src/shared/strategies/user.strategy';
import { Company } from 'src/company/company.entity';
import { ServicesOfUsers } from 'src/services-of-users/services-of-users.entity';
import { ServicesOfUsersModule } from 'src/services-of-users/services-of-users.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company, ServicesOfUsers]),
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, UserStrategy],
  exports: [JwtModule, UserService],
})
export class UserModule {}
