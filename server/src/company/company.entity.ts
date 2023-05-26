import { BaseService } from 'src/base-service/base-service.entity';
import { Service } from 'src/service/service.entity';
import { User } from 'src/user/user.entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('company')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  logo: string;

  @Column({nullable: false, default: 0})
  complainCount: number;

  @Column({ type: 'float4', nullable: false, default: 0 })
  point: number;

  @Column({ type: 'smallint', default: 0 })
  votesCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.company, { nullable: false })
  user: User;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.company, {
    onDelete: 'CASCADE',
  })
  vehicles: Vehicle[];

  @OneToMany(() => BaseService, (service) => service.company, {
    onDelete: 'CASCADE',
  })
  services: BaseService[];
}
