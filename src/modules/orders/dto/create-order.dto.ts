import { IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsEnum(['pending', 'shipped', 'delivered', 'cancelled'])
  status?: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}