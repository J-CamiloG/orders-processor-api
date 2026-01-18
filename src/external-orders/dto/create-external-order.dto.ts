import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';

export class CreateExternalOrderDto {
  @ApiProperty({ example: 'ORD-1001' })
  @IsString()
  order_number: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  customer: string;

  @ApiProperty({ example: 'Laptop' })
  @IsString()
  product: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  quantity: number;
}
