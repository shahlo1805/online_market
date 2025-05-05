import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PostgresService } from 'src/database/db';

@Injectable()
export class OrderService {
  constructor(private readonly pg: PostgresService) {}

  async createOrder(order: CreateOrderDto) {
    const { userId, totalPrice, status } = order;
    const result = await this.pg.query(
      'INSERT INTO orders(user_id, total_price, status) VALUES($1, $2, $3) RETURNING *',
      [userId, totalPrice, status ?? 'pending'],
    );

    return {
      message: 'Order created',
      data: result[0],
    };
  }

  async getAllOrders() {
    const result = await this.pg.query('SELECT * FROM orders');
    return {
      message: 'All orders',
      count: result.length,
      data: result,
    };
  }

  async getOrderById(id: number) {
    const result = await this.pg.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result[0];
  }

  async deleteOrder(id: number) {
    await this.pg.query('DELETE FROM orders WHERE id = $1', [id]);
    return { message: 'Order deleted' };
  }
}