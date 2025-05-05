import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PostgresService } from 'src/database';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PostgresService],
})
export class ProductModule {}