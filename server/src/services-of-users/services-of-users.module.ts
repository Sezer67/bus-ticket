import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesOfUsers } from './services-of-users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesOfUsers])],
})
export class ServicesOfUsersModule {}
