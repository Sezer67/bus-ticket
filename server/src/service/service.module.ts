import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { ServicesOfUsers } from 'src/services-of-users/services-of-users.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { VehicleModule } from 'src/vehicle/vehicle.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Service, ServicesOfUsers]),
    forwardRef(() => VehicleModule),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
