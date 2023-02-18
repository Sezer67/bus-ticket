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

  @Column({ type: 'uuid', nullable: false, unique: true, default: v4() })
  PNRNumber: string;

  @Column({ type: 'boolean', default: false })
  isToVote: boolean;

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
