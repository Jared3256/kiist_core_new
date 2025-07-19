import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateOrdersDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(24)
  @MaxLength(24)
  user: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;
}
