import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Complain } from "./complain.entity";
import { ComplainController } from "./complain.controller";
import { ComplainService } from "./complain.service";
import { Service } from "src/service/service.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Complain,Service])],
    controllers:[ComplainController],
    providers: [ComplainService],
})

export class ComplainModule {}