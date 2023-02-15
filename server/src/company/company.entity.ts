import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('company')
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  logo: string;

  @OneToOne(() => User, (user) => user.company)
  user: User;
}
