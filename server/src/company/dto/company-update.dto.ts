import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CompanyUpdateDto {
  @IsOptional()
  @IsNumber()
  @Max(5)
  @Min(0)
  point?: number;
}
