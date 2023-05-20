import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { Between, FindOptionsOrder, In, Repository } from 'typeorm';
import { Request } from 'express';
import { ServiceCreateDto } from './dto/service-create.dto';
import { ServiceLookupDto, TravelLookupDto } from './dto/service-lookup.dto';
import { User } from 'src/user/user.entity';
import { ServiceBuyTicketDto } from './dto/service-ticket-buy.dto';
import { ServicesOfUsers } from 'src/services-of-users/services-of-users.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import { VehiclePointsUpdateDto } from 'src/vehicle/dto/vehicle-update.dto';
@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly repo: Repository<Service>,
    @InjectRepository(ServicesOfUsers)
    private readonly serviceOfUserRepo: Repository<ServicesOfUsers>,
    @Inject(forwardRef(() => VehicleService))
    private readonly vehicleService: VehicleService,
  ) {}
  travelConstantVariables = {
    select: {
      id: true,
      fullName: true,
      isToVote: true,
      seatNumber: true,
      companyName: true,
      service: {
        id: true,
        arrivalCity: true,
        arrivalDate: true,
        departureCity: true,
        departureDate: true,
        price: true,
        baseService: {
          id: true,
          isCompleted: true,
        },
      },
    },
    order: {
      service: {
        arrivalDate: 'DESC',
      },
    } as FindOptionsOrder<ServicesOfUsers>,
    relations: {
      service: {
        baseService: true,
      },
    },
  };
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
      const { id, passengerInfoList } = dto;
      const service = await this.repo.findOne({
        where: {
          id,
        },
      });
      const filledSeats = [
        ...service.filledSeats.filter((val) => val !== '[]'),
      ];
      const createdTickects = [];

      for await (const info of passengerInfoList) {
        filledSeats.push(info.seatNumber.toString());
        const ticket = await this.serviceOfUserRepo.save({
          ...info,
          mail: info.mail.toLowerCase(),
          userId: user.id,
          serviceId: id,
          companyName: 'KAMILKOC',
        });
        createdTickects.push(ticket);
      }
      console.log(filledSeats);
      await this.repo.update({ id }, { filledSeats });
      console.log(createdTickects);
      return createdTickects;
    } catch (error) {
      throw error;
    }
  }

  async getTravelsMe(dto: TravelLookupDto, user: User) {
    try {
      // önce o kullanıcının service of users alanından service leri bulunmalı
      const query: any = {};

      {
        if (dto.limit) {
          query.take = dto.limit;
        }

        if (dto.offset) {
          query.skip = dto.offset;
        }
      }

      const [rows, count] = await this.serviceOfUserRepo.findAndCount({
        where: {
          userId: user.id,
        },
        ...query,
        ...this.travelConstantVariables,
      });

      return {
        rows,
        count,
      };
    } catch (error) {
      throw error;
    }
  }

  async vote(dto: VehiclePointsUpdateDto, user: User) {
    try {
      console.log(dto);
      const service = await this.serviceOfUserRepo.findOne({
        where: {
          id: dto.id,
        },
        relations: {
          service: {
            baseService: true,
          }
        },
        select: {
          id: true,
          isToVote: true,
          service: {
            id: true,
            baseService: {
              id: true,
              vehicleId: true
            }
          },
        },
      });
      console.log("-------------");
      console.log(service);
      if(!service){
        throw new HttpException(
          'Not Found',
          HttpStatus.NOT_FOUND,
        );
      }
      if (service.isToVote) {
        throw new HttpException(
          'You have already voted this trip',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.vehicleService.voteVehicle({
        ...dto,
        id: service.service.baseService.vehicleId
      });
      service.isToVote = true;
      await this.serviceOfUserRepo.update(service.id,service);

      return 'success';
    } catch (error) {
      throw error;
    }
  }
}
