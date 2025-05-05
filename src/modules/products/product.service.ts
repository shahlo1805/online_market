import { Injectable, OnModuleInit } from '@nestjs/common';
import { IProduct } from './interface';
import { PostgresService } from 'src/database';
import { productTableModel } from './model';
import { QueryProductDto } from './dto/get-all-products.dto';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(private readonly pg: PostgresService) {}

  async onModuleInit() {
    try {
      await this.pg.query(productTableModel);
      console.log('Product table yaratildi');
    } catch (error) {
      console.log('Product table yaratishda xatolik');
    }
  }

  async create(product: IProduct) {
    const { name, count, price, categoryId } = product;
    const result = await this.pg.query(
      'INSERT INTO products (name, count, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, count, price, categoryId],
    );

    return {
      message: 'success',
      count: result.length,
      data: result[0],
    };
  }

  async getAll(query: QueryProductDto) {
    const { limit = 10, page = 1, sortField = 'id', sortOrder = 'asc' } = query;
    const offset = (page - 1) * limit;
    const field = ['price'];
    const order = sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    const result = await this.pg.query(
      `SELECT * FROM products ORDER BY ${field} ${order} LIMIT $1 OFFSET $2`,
      [limit, offset],
    );
    return {
      message: 'success',
      count: result.length,
      data: result,
    };
  }

  async getOne(id: number) {
    const result = await this.pg.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);
    return {
      message: 'success',
      data: result[0],
    };
  }

  async update(id: number, product: Partial<IProduct>) {
    const { name, count, price, categoryId } = product;
    const result = await this.pg.query(
      `UPDATE products SET 
        name = COALESCE($1, name),
        count = COALESCE($2, count),
        price = COALESCE($3, price),
        categoryId = COALESCE($4, categoryId)
       WHERE id = $5 RETURNING *`,
      [name, count, price, categoryId, id],
    );
    return {
      message: 'success',
      count: result.length,
      data: result[0],
    };
  }

  async delete(id: number) {
    await this.pg.query('DELETE FROM products WHERE id = $1', [id]);
    return {
      message: 'success',
    };
  }
}
