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

@Entity('service')
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'smallint', nullable: false })
  startPrice: number;

  @Column({ type: 'smallint', nullable: false })
  endPrice: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  arrivalTime: string;

  @Column({ type: 'date', nullable: false })
  departureDate: Date;

  @Column({ type: 'smallint', enum: Cities, nullable: false })
  departureCity: Cities;

  @Column({ type: 'smallint', enum: Cities, nullable: false })
  arrivalCity: Cities;

  @Column({ type: 'text', nullable: false })
  route: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.services, { nullable: false })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column()
  vehicleId: string;

  @ManyToOne(() => Company, (company) => company.services, { nullable: false })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: string;

  @OneToMany(() => ServicesOfUsers, (entity) => entity.service)
  users: ServicesOfUsers[];
}
