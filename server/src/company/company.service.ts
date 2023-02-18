import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { In, Repository } from 'typeorm';
import { CompanyCreateDto } from './dto/company-create.dto';
import { Request } from 'express';
import { CompanyUpdateDto } from './dto/company-update.dto';
import { companyHelper } from 'src/shared/helpers';
import { User } from 'src/user/user.entity';
import { ICompanyLookupResponse } from 'src/shared/interfaces/company.interface';
import { CompanyLookupDto } from './dto/company-lookup.dto';
@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly repo: Repository<Company>,
  ) {}

  async lookup(dto: CompanyLookupDto): Promise<ICompanyLookupResponse> {
    try {
      const result: ICompanyLookupResponse = { rows: [], count: 0 };
      const query: Record<string, string | object | number> = {};

      {
        const where: any = {};
        if (dto.ids) {
          where.id = In(dto.ids);
        }

        if (dto.limit) {
          query.take = dto.limit;
        }
        if (dto.offset) {
          query.skip = dto.offset;
        }

        query.where = where;
      }
      const companies = await this.repo.findAndCount(query);

      result.rows = companies[0];
      result.count = companies[1];

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createCompany(dto: CompanyCreateDto, req: Request): Promise<Company> {
    try {
      return await this.repo.save({
        ...dto,
        user: req.user,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateCompany(dto: CompanyUpdateDto, req: Request): Promise<Company> {
    try {
      const company = await this.repo.findOne({
        where: {
          user: req.user,
        },
      });
      company.point = companyHelper.pointCalculate(
        company.point,
        dto.point,
        ++company.votesCount,
      );

      return await company.save();
    } catch (error) {
      throw error;
    }
  }
}
