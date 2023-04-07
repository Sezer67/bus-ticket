import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { Between, Repository } from 'typeorm';
import { Request } from 'express';
import { ServiceCreateDto } from './dto/service-create.dto';
import { ServiceLookupDto } from './dto/service-lookup.dto';
@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly repo: Repository<Service>,
  ) {}

  async createService(dto: any, req: Request): Promise<Service[]> {
    try {
      const createdServices: Service[] = [];
      for await (const data of dto.datas) {
        const service = await this.repo.save({
          ...data,
          baseServiceId: dto.baseServiceId,
        });
        createdServices.push(service);
      }
      return createdServices;
    } catch (error) {
      throw error;
    }
  }

  async lookup(dto: ServiceLookupDto) {
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
        if (dto.limit) {
          query.take = dto.limit;
        }
        if (dto.offset) {
          query.skip = dto.offset;
        }
        where.departureCity = dto.from;
        where.arrivalCity = dto.to;
        where.departureDate = Between(
          new Date(
            dto.date.getFullYear(),
            dto.date.getMonth(),
            dto.date.getDate(),
            0,
            0,
            0,
            0,
          ),
          new Date(
            dto.date.getFullYear(),
            dto.date.getMonth(),
            dto.date.getDate(),
            23,
            59,
          ),
        );
        console.log(
          'Between : ',
          new Date(
            dto.date.getFullYear(),
            dto.date.getMonth(),
            dto.date.getDate(),
            0,
            0,
            0,
            0,
          ),
          new Date(
            dto.date.getFullYear(),
            dto.date.getMonth(),
            dto.date.getDate(),
            23,
            59,
          ),
        );
        query.where = where;
        query.select = select;
      }

      const [rows, count] = await this.repo.findAndCount(query);

      return {
        rows,
        count,
      };

      return await this.repo.findAndCount({
        where: {},
        relations: ['company', 'vehicle'],
      });
    } catch (error) {
      throw error;
    }
  }
}
