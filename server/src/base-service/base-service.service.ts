import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from './base-service.entity';
import { Repository } from 'typeorm';
import { CreateBaseServiceDto } from './dto/create-base-service.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class BaseServiceService {
  constructor(
    @InjectRepository(BaseService)
    private readonly repo: Repository<BaseService>,
  ) {}

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
}
