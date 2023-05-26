import { IsBoolean, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ComplainCreateAnswer {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    answer: string;
}


export class ComplainUpdateReadStatus {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsBoolean()
    isCompany: string;
}