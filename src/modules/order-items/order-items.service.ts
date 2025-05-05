import { Injectable } from "@nestjs/common";
import { PostgresService } from "src/database";
import { CreateOrderItemDto, UpdateOrderItemDto } from "./dto";
import { orderItemModule } from "./order-items.module";
import { orderItemsModel } from "./model";

@Injectable()
export class OrderItemService {
  constructor(private readonly pg: PostgresService) {}

  async onModuleInit() {
        try {
          await this.pg.query(orderItemsModel);
          console.log('Order-item table yaratildi');
        } catch (error) {
          console.log('Order-item table yaratishda xatolik');
        }
      }

  async create(payload: CreateOrderItemDto) {
    const { order_id, product_name, quantity, price } = payload;

    const result = await this.pg.query(
      `INSERT INTO order_items (order_id, product_name, quantity, price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [order_id, product_name, quantity, price],
    );

    return {
      message: 'created',
      data: result[0],
    };
  }

  async findAll() {
    const result = await this.pg.query('SELECT * FROM order_items');
    return result;
  }

  async findOne(id: number) {
    const result = await this.pg.query('SELECT * FROM order_items WHERE id = $1', [id]);
    return result[0];
  }

//   async update(id: number, payload: UpdateOrderItemDto) {
//     const fields = [];
//     const values = [];
//     let index = 1;

//     for (let key in payload) {
//       fields.push(`${key} = ${index}`);
//       values.push((payload as any)[key]);
//       index++;
//     }

//     values.push(id);

//     const result = await this.pg.query(
//       `UPDATE order_items SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
//       values
//     );

//     return result[0];
//   }

  async remove(id: number) {
    await this.pg.query('DELETE FROM order_items WHERE id = $1', [id]);
    return { message: 'deleted' };
  }
}