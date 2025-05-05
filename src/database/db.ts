import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Pool, QueryResultRow } from 'pg';

@Injectable()
export class PostgresService {
  #_pool: Pool;
  constructor() {
    this.#_pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env?.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  async query(queryStr: string, params: any[] = []): Promise<QueryResultRow> {
    try {
      const result = await this.#_pool.query(queryStr, params);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Databazaga ulanishda xatolik: err:',
        error,
      );
    }
  }
}
