import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseService } from './base-service.entity';
import { BaseServiceController } from './base-service.controller';
import { BaseServiceService } from './base-service.service';

@Module({
  imports: [TypeOrmModule.forFeature([BaseService])],
  controllers: [BaseServiceController],
  providers: [BaseServiceService],
})
export class BaseServiceModule {}
