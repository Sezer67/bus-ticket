import { Company } from 'src/company/company.entity';
import { Service } from 'src/service/service.entity';
import { vehicleEnum } from 'src/shared/enums';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vehicle')
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: vehicleEnum.VehicleTypes, nullable: false })
  vehicleType: vehicleEnum.VehicleTypes;

  @Column({ type: 'smallint', nullable: false })
  seatCount: number;

  @Column({ type: 'varchar', length: 15, nullable: false, unique: true })
  plate: string;

  @Column({ type: 'varchar', length: 4, nullable: false, default: '2+1' })
  seatingPlan: string;

  @Column({ type: 'boolean', default: false })
  isWifi: boolean;

  @Column({ type: 'boolean', default: false })
  isJack: boolean;

  @Column({ type: 'boolean', default: false })
  isTV: boolean;

  @Column({ type: 'float4', nullable: false, default: 0 })
  comfortPoint: number;

  @Column({ type: 'float4', nullable: false, default: 0 })
  speedPoint: number;

  @Column({ type: 'float4', nullable: false, default: 0 })
  servicePoint: number;

  @Column({ type: 'smallint', default: 0 })
  votesCount: number;

  @ManyToOne(() => Company, (company) => company.vehicles, { nullable: false })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: string;

  @OneToMany(() => Service, (service) => service.vehicle, {
    onDelete: 'CASCADE',
  })
  services: Service[];
}
