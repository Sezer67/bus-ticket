import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/role.decorator';
import { userEnum } from 'src/shared/enums';
import { Request } from 'express';
import { VehicleCreateDto } from './dto/vehicle-create.dto';
import { Vehicle } from './vehicle.entity';
import {
  VehicleInfoUpdateDto,
  VehiclePointsUpdateDto,
} from './dto/vehicle-update.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly service: VehicleService) {}

  @Get('/')
  @UseGuards(AuthGuard('user'))
  lookup(@Query() dto: any) {
    return this.service.lookup(dto);
  }

  @Post('/')
  @UseGuards(AuthGuard('user'), RolesGuard)
  @Roles(userEnum.Role.Company)
  create(@Body() dto: VehicleCreateDto, @Req() req: Request): Promise<Vehicle> {
    return this.service.createVehicle(dto, req);
  }

  @Put('/information')
  @UseGuards(AuthGuard('user'), RolesGuard)
  @Roles(userEnum.Role.Company)
  updateInformation(@Body() dto: VehicleInfoUpdateDto) {
    return this.service.updateVehicle(dto);
  }

  @Put('/point')
  @UseGuards(AuthGuard('user'), RolesGuard)
  @Roles(userEnum.Role.Customer)
  updatePoints(@Body() dto: VehiclePointsUpdateDto) {
    // return this.service.updateVehicle(dto);
  }
}
