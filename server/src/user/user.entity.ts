import { Company } from 'src/company/company.entity';
import { Complain } from 'src/complain/complain.entity';
import { ServicesOfUsers } from 'src/services-of-users/services-of-users.entity';
import { userEnum } from 'src/shared/enums';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  fullName: string;

  @Column({ type: 'text', nullable: true })
  identityNumber: string;

  @Column({ type: 'smallint', enum: userEnum.Gender })
  gender: userEnum.Gender;

  @Column({
    type: 'smallint',
    enum: userEnum.Role,
    default: userEnum.Role.Customer,
  })
  role: userEnum.Role;

  @Column({ type: 'text', nullable: false, unique: true })
  mail: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ type: 'text', nullable: false })
  password: string;

  @OneToOne(() => Company, (company) => company.user, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  companyId: string;

  @OneToMany(() => ServicesOfUsers, (entity) => entity.user, {
    onDelete: 'CASCADE',
  })
  services: ServicesOfUsers[];

  @OneToMany(() => Complain, (entity) => entity.user, {
    onDelete: 'SET NULL',
  })
  complains: Complain[];

}
