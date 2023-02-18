import { Injectable, Inject, forwardRef, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';
import { VehicleCreateDto } from './dto/vehicle-create.dto';
import { VehicleInfoUpdateDto } from './dto/vehicle-update.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly repo: Repository<Vehicle>,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  async lookup(dto: any) {
    try {
      return await this.repo.findAndCount({
        relations: ['company'],
      });
    } catch (error) {
      throw error;
    }
  }

  async createVehicle(dto: VehicleCreateDto, req: any): Promise<Vehicle> {
    try {
      const vehicle = await this.repo.save({
        ...dto,
        companyId: req.user.companyId,
      });
      return vehicle;
    } catch (error) {
      throw error;
    }
  }
  async updateVehicle(dto: VehicleInfoUpdateDto): Promise<Vehicle> {
    try {
      const result = await this.repo.update(dto.id, dto);
      if (result.affected === 0) {
        throw new HttpException('Vehicle Not Found', 404);
      }
      const vehicle = await this.repo.findOneBy({
        id: dto.id,
      });
      return vehicle;
    } catch (error) {
      throw error;
    }
  }
}
