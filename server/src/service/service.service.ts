import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { Between, In, Repository } from 'typeorm';
import { Request } from 'express';
import { ServiceCreateDto } from './dto/service-create.dto';
import { ServiceLookupDto } from './dto/service-lookup.dto';
import { User } from 'src/user/user.entity';
import { ServiceBuyTicketDto } from './dto/service-ticket-buy.dto';
import { ServicesOfUsers } from 'src/services-of-users/services-of-users.entity';
@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly repo: Repository<Service>,
    @InjectRepository(ServicesOfUsers)
    private readonly serviceOfUserRepo: Repository<ServicesOfUsers>,
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
        let select: any = {};

        if (dto.companyIds) {
          where.baseService = {
            company: {
              id: In(dto.companyIds),
            },
          };
        }
        if (dto.seatingPlans) {
          const arr = dto.seatingPlans.map((plan) => plan.replace(' ', '+'));
          where.baseService = {
            ...where.baseService,
            vehicle: {
              seatingPlan: In(arr),
            },
          };
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
        where.departureCity = dto.from;
        where.arrivalCity = dto.to;
        where.departureDate = Between(
          new Date(
            dto.date.getFullYear(),
            dto.date.getMonth(),
            dto.date.getDate() - 1,
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

        // default select added
        select = {
          ...select,
          baseService: {
            route: true,
            company: {
              id: true,
              name: true,
            },
            vehicle: {
              id: true,
              plate: true,
              seatingPlan: true,
            },
          },
        };
        query.select = select;
        query.relations = {
          baseService: {
            company: true,
            vehicle: true,
          },
        };
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

  async buyTicket(dto: ServiceBuyTicketDto, user: User) {
    try {
      const {id, passengerInfoList} = dto;
      const service = await this.repo.findOne({
        where: {
          id
        }
      });
      const filledSeats = [...service.filledSeats.filter((val) => val !== '[]')];
      const createdTickects = [];

      for await (const info of passengerInfoList) {
        filledSeats.push(info.seatNumber.toString());
        const ticket = await this.serviceOfUserRepo.save({
          ...info,
          mail: info.mail.toLowerCase(),
          userId: user.id,
          serviceId: id,
        });
        createdTickects.push(ticket);
      }
      console.log(filledSeats);
      await this.repo.update({id}, {filledSeats});
      console.log(createdTickects);
      return createdTickects;
    } catch (error) {
      throw error;
    }
  }
}
