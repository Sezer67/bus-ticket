import { Service } from "src/service/service.entity";
import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// Customer tarafından oluşturulur.
@Entity('complain')
export class Complain extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    companyName: string;

    @Column({nullable: false})
    subject: string;

    @Column({nullable: false})
    message: string;

    @Column({nullable: true})
    answer: string;

    @Column({type:'boolean',nullable: true, default: null})
    isReadCompany: boolean;

    @Column({type:'boolean',nullable: true, default: null})
    isReadCustomer: boolean;

    @Column({nullable: false})
    createdDate: Date;

    @Column({nullable: true})
    updatedDate: Date;

    @ManyToOne(() => User, (user) => user.complains, {})
    @JoinColumn({name: 'userId'})
    user: User;

    @Column()
    userId: string;

    @Column()
    companyOwnerId: string;

    @ManyToOne(() => Service, (service) => service.complains, {})
    @JoinColumn({name: 'serviceId'})
    service: Service;

    @Column()
    serviceId: string;
}