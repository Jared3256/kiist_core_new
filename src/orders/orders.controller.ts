import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Orders } from './schema/order.schema';
import { CreateOrdersDto } from './dto/create.orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get('listall')
  async getAllOrders(): Promise<Orders[]> {
    return this.orderService.getAllOrders();
  }

  @Post('create')
  async createNewOrder(
    @Body(ValidationPipe) order: CreateOrdersDto,
  ): Promise<object> {
    return this.orderService.createNewOrder(order);
  }
}
