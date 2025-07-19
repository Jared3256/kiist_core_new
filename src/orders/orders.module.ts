import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrdersSchema } from './schema/order.schema';
import { User1Schema } from '../users/user.schema';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Orders.name,
        schema: OrdersSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User1Schema.name,
        schema: User1Schema,
      },
    ]),
  ],
})
export class OrdersModule {}
