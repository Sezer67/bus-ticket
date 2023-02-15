import { userEnum } from 'src/shared/enums';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'text', nullable: false })
  mail: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ type: 'text', nullable: false })
  password: string;
}
