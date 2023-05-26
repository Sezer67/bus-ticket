import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Complain } from './complain.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreateComplainDto } from './dto/complain-create.dto';
import { MailService } from 'src/mail/mail.service';
import { Service } from 'src/service/service.entity';
import { userEnum } from 'src/shared/enums';
import { ComplainCreateAnswer, ComplainUpdateReadStatus } from './dto/complain-update.dto';

@Injectable()
export class ComplainService {
  constructor(
    @InjectRepository(Complain)
    private readonly repo: Repository<Complain>,
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    private readonly mailService: MailService,
  ) {}
  // company yanıt verdiği update işleminde customer okumadı olarak işaretlenecek compnany true olacak.
  // front tarafında okundu olarak işaretlenmesi için tıklaması gerekecek.
  async create(dto: CreateComplainDto, user: User) {
    try {
      // hem şirketin mailine hem de admine mesaj gitsin
      const service = await this.serviceRepo.findOne({
        where: {
          id: dto.serviceId,
        },
        relations: {
          baseService: {
            company: {
              user: true,
            },
          },
        },
        select: {
          id: true,
          baseService: {
            id: true,
            company: {
              id: true,
              user: {
                id: true,
                mail: true,
              },
            },
          },
        },
      });
      const complain = await this.repo.save({
        ...dto,
        userId: user.id,
        createdDate: new Date(),
        updatedDate: new Date(),
        isReadCompany: false,
        companyOwnerId: service.baseService.company.user.id,
      });
      console.log('---------------------');
      console.log('user maili : ', service.baseService.company.user.mail);
      console.log('---------------------');
      await this.mailService.complainCreateMail(
        'skenar@stilus.com.tr',
        dto.subject,
        dto.message,
      );
      return {
        message: 'success',
      };
    } catch (error) {
      throw error;
    }
  }

  async getNotReadCount(user: User):Promise<{count: number}> {
    try {
      const query: any = {};
      {
        const where: any = {};
        if (user.role === userEnum.Role.Company) {
          where.isReadCompany = false;
          where.companyOwnerId = user.id;
        } else {
          where.isReadCustomer = false;
          where.userId = user.id;
        }
        query.where = where;
      }
      const [rows, count] = await this.repo.findAndCount(query);

      return { count };
    } catch (error) {
      throw error;
    }
  }

  async getComplains(user: User): Promise<Complain[]> {
    try {
      const relations = {
        user: true,
      }
      if (user.role === userEnum.Role.Customer) {
        return await this.repo.find({
          where: {
            userId: user.id,
          },
          relations,
          order: {
            updatedDate: 'DESC'
          }
        });
      }

      return await this.repo.find({
        where: {
          companyOwnerId: user.id,
        },
        relations,
        order: {
          updatedDate: 'DESC'
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async answerComplain(dto: ComplainCreateAnswer): Promise<Complain> {
    try {
      const complain = await this.repo.findOneBy({ id: dto.id });
      complain.answer = dto.answer;
      complain.updatedDate = new Date();
      complain.isReadCustomer = false;

      await this.repo.update({ id: complain.id }, complain);

      return complain;
    } catch (error) {
      throw error;
    }
  }

  async changeToRead(dto: ComplainUpdateReadStatus): Promise<Complain> {
    try {
      const complain = await this.repo.findOneBy({ id: dto.id });
      if (dto.isCompany) {
        complain.isReadCompany = true;
      } else {
        complain.isReadCustomer = true;
      }
      await this.repo.update({ id: complain.id }, complain);

      return complain;
    } catch (error) {
      throw error;
    }
  }
}
