import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateOrderItemDto, UpdateOrderItemDto } from "./dto";
import { OrderItemService } from "./order-items.service";

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly service: OrderItemService) {}

  @Post()
  create(@Body() dto: CreateOrderItemDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

//   @Patch(':id')
//   update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderItemDto) {
//     return this.service.update(id, dto);
//   }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}