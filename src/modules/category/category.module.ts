
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryController } from './category.controller';
import { PostgresService } from 'src/database';
import { LoggerMiddleware } from 'src/middleware';

@Module({
    controllers: [categoryController],
    providers: [CategoryService, PostgresService],
})

export class CategoryModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes(categoryController);
    }
}