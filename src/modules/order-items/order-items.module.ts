import { Module } from "@nestjs/common";
import { OrderItemController } from "./order-items.controller";
import { PostgresService } from "src/database";
import { OrderItemService } from "./order-items.service";

@Module({
    controllers: [OrderItemController],
    providers: [OrderItemService, PostgresService]
})
export class orderItemModule {}