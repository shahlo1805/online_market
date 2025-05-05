import { IsNumber, isNumber, isNumberString, IsString } from "class-validator";

export class CreateOrderItemDto {
    @IsNumber()
    order_id: number;

    @IsString()
    product_name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
  }