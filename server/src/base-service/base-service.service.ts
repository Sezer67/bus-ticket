import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from './base-service.entity';
import { In, Repository } from 'typeorm';
import { CreateBaseServiceDto } from './dto/create-base-service.dto';
import { User } from 'src/user/user.entity';
import { BaseServiceLookupDto } from './dto/lookup.dto';
import { IBaseServiceLookupResponse } from 'src/shared/interfaces/service.interface';
@Injectable()
export class BaseServiceService {
  constructor(
    @InjectRepository(BaseService)
    private readonly repo: Repository<BaseService>,
  ) {}

  private vehicleSelect = {
    id: true,
    plate: true,
    vehicleType: true,
  };

  async create(dto: CreateBaseServiceDto, user: User): Promise<BaseService> {
    try {
      return await this.repo.save({
        ...dto,
        companyId: user.companyId,
      });
    } catch (error) {
      throw error;
    }
  }

  async get(user: User) {
    try {
      return await this.repo.find({
        where: {
          companyId: user.companyId,
        },
        relations: {
          company: true,
          services: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async lookup(
    dto: BaseServiceLookupDto,
    user: User,
  ): Promise<IBaseServiceLookupResponse> {
    try {
      const query: any = {};

      {
        const where: any = {};
        const select: any = {};

        if (dto.relations) {
          query.relations = [...dto.relations];
        }

        if (dto.select) {
          dto.select.forEach((val) => {
            select[val] = true;
          });
        }
        if (dto.relations.includes('vehicle')) {
          select.vehicle = { ...this.vehicleSelect };
        }

        if (dto.ids) {
          where.id = In(dto.ids);
        }
        if (dto.limit) {
          query.take = dto.limit;
        }
        if (dto.offset) {
          query.skip = dto.offset;
        }

        where.companyId = user.companyId;

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
}
