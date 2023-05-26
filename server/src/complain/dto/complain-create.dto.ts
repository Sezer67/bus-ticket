import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateComplainDto {
    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsOptional()
    @IsString()
    companyName?: string;

    @IsNotEmpty()
    @IsString()
    serviceId: string;
}