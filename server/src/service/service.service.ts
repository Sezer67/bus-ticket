import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { ServiceCreateDto } from './dto/service-create.dto';
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

  async lookup() {
    try {
      return await this.repo.findAndCount({
        where: {},
        relations: ['company', 'vehicle'],
      });
    } catch (error) {
      throw error;
    }
  }
}
