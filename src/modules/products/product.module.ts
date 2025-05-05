import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PostgresService } from 'src/database';
import { ProductUploadHelper } from 'src/helpers/product.fs';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PostgresService, ProductUploadHelper],
})
export class ProductModule {}