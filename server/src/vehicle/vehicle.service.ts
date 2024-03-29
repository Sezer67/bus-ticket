import { Injectable, Inject, forwardRef, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { In, Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';
import { VehicleCreateDto } from './dto/vehicle-create.dto';
import { VehicleInfoUpdateDto } from './dto/vehicle-update.dto';
import { VehicleLookupDto } from './dto/vehicle-lookup.dto';
import { User } from 'src/user/user.entity';
import { IVehicleLookupResponse } from 'src/shared/interfaces/vehicle.interface';
import { VehiclePointsUpdateDto } from './dto/vehicle-update.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly repo: Repository<Vehicle>,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
  ) {}

  async lookup(
    dto: VehicleLookupDto,
    user: User,
  ): Promise<IVehicleLookupResponse> {
    try {
      const query: any = {};

      {
        const where: any = {};
        const select: any = {};

        if(dto.ids){
          where.id = In(dto.ids);
        }
        if(dto.plates){
          where.plate = In(dto.plates);
        }
        if (dto.relations) {
          query.relations = [...dto.relations];
        }

        if (dto.select) {
          dto.select.forEach((val) => {
            select[val] = true;
          });
        }
        if (dto.limit) {
          query.take = dto.limit;
        }
        if (dto.offset) {
          query.skip = dto.offset;
        }
        if (user.companyId) {
          where.companyId = user.companyId;
        }
        query.where = where;
        query.select = select;
      }
      
      const [rows, count] = await this.repo.findAndCount(query);

      return {
        rows,
        count,
      };
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

  async voteVehicle(dto: VehiclePointsUpdateDto) {
    try {
      const vehicle = await this.repo.findOneBy({id: dto.id});
      const totalPoints = {
        comfort: vehicle.votesCount * vehicle.comfortPoint,
        speed: vehicle.votesCount * vehicle.speedPoint,
        service: vehicle.votesCount * vehicle.servicePoint,
      }
      vehicle.votesCount += 1;
      vehicle.comfortPoint = (totalPoints.comfort + dto.comfortPoint) / vehicle.votesCount;
      vehicle.servicePoint = (totalPoints.service + dto.servicePoint) / vehicle.votesCount;
      vehicle.speedPoint = (totalPoints.speed + dto.speedPoint) / vehicle.votesCount;

      const {affected} =  await this.repo.update(dto.id,vehicle);

      if(affected === 0){
        throw new HttpException('Vehicle Not Found', 404);
      }
      return vehicle;
    } catch (error) {
      throw error;
    }
  }
}
