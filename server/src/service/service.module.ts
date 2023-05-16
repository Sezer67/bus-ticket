import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { ServicesOfUsers } from 'src/services-of-users/services-of-users.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Service,ServicesOfUsers])],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
