import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";

class PassengerInfo {
    @IsNotEmpty()
    @IsString()
    fullName: string;
    
    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @IsNotEmpty()
    @IsNumber()
    seatNumber: number;
}

export class ServiceBuyTicketDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    @ArrayMinSize(1)
    @Type(() => PassengerInfo)
    passengerInfoList: PassengerInfo[]
}