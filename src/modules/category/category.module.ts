import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryController } from './category.controller';
import { PostgresService } from 'src/database';
import { LoggerMiddleware } from 'src/middleware';
import { FsHelper } from '../../helpers/fs.helper';

@Module({
  controllers: [categoryController],
  providers: [CategoryService, PostgresService, FsHelper],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(categoryController);
  }
}
