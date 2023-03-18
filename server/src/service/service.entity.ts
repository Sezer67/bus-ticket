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

  @Column({ type: 'date', nullable: false })
  arrivalDate: Date;

  @Column({ type: 'date', nullable: false })
  departureDate: Date;

  @Column({ type: 'text', nullable: false })
  departureCity: string;

  @Column({ type: 'text', nullable: false })
  arrivalCity: string;

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
