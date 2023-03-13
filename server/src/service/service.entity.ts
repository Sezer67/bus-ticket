import { BaseService } from 'src/base-service/base-service.entity';
import { Company } from 'src/company/company.entity';
import { ServicesOfUsers } from 'src/services-of-users/services-of-users.entity';
import { Cities } from 'src/shared/enums/service.enum';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// istanbul - izmir
// istanbul - kocaeli - bursa - manisa - izmir
// istanbul -> kocaeli - bursa - manisa - izmir
// kocaeli -> bursa - manisa - izmir
// bursa -> manisa - izmir

//istanbul -kocaeli
// kocaeli bursa
// ana seferde (base-service) koltuklları tut.
// ve her dolan koltuk için o seferin route detayına (service) git ve orda o koltuğu doldur.
// base-service id si tutulacak.
@Entity('service')
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint', nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  arrivalTime: string;

  @Column({ type: 'date', nullable: false })
  departureDate: Date;

  @Column({ type: 'smallint', enum: Cities, nullable: false })
  departureCity: Cities;

  @Column({ type: 'smallint', enum: Cities, nullable: false })
  arrivalCity: Cities;

  @Column({ type: 'simple-array', default: [], nullable: false })
  filledSeats: string[];

  @ManyToOne(() => BaseService, (entity) => entity.services)
  @JoinColumn({ name: 'baseServiceId' })
  baseService: BaseService;

  @Column()
  baseServiceId: string;

  @OneToMany(() => ServicesOfUsers, (entity) => entity.service)
  users: ServicesOfUsers[];
}
