import { IsNotEmpty, IsNumber } from "class-validator";

export class TicketPayDto {
    @IsNotEmpty()
    @IsNumber()
    price: number;
}