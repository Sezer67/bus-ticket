import { Service } from 'src/service/service.entity';
import { User } from 'src/user/user.entity';
import { v4 } from 'uuid';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('services-of-users')
export class ServicesOfUsers extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  companyName: string;

  @Column({ type: 'smallint', nullable: false })
  seatNumber: number;

  @Column({ type: 'boolean', default: false })
  isToVote: boolean;

  @Column({nullable: false})
  fullName: string;

  @Column({nullable: false})
  mail: string;

  @ManyToOne(() => User, (user) => user.services)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Service, (service) => service.users)
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  @Column()
  serviceId: string;
}
