import { Company } from 'src/company/company.entity';
import { Service } from 'src/service/service.entity';
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

@Entity('base-service')
export class BaseService extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  route: string;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ type: 'int', default: 0 })
  winnings: number;

  @Column({ type: 'smallint', default: 0 })
  ticketsCount: number;

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

  @OneToMany(() => Service, (service) => service.baseService, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  services: Service[];
}
