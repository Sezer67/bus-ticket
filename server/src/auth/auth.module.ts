import { Module, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesOfUsers } from 'src/services-of-users/services-of-users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ServicesOfUsers])],
  controllers: [AuthController],
  providers: [UserService],
  exports: [],
})
export class AuthModule {}
