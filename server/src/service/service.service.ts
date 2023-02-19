import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { ServiceCreateDto } from './dto/service-create.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly repo: Repository<Service>,
  ) {}

  async createService(dto: ServiceCreateDto, req: Request): Promise<Service> {
    try {
      const service = await this.repo.save({
        ...dto,
        companyId: (req.user as User).companyId,
      });
      return service;
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
