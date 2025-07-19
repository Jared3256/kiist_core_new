import { Orders } from './schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { User1Schema } from '../users/user.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders.name)
    private orders: mongoose.Model<Orders>,
    @InjectModel(User1Schema.name)
    private userModel: mongoose.Model<User1Schema>,
  ) {}

  /**
   * @name GetAllOrders
   * @description This is service method returns all the available Orders in the database
   * @method GET
   * @returns List of Orders
   * @scope PUBLIC
   */
  async getAllOrders(): Promise<Orders[]> {
    try {
      const result = await this.orders.find().populate('user');

      if (!result.length) {
        throw new NotFoundException('Orders not found');
      }
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async createNewOrder(order): Promise<object> {
    try {
      //Check if the user id is in the database
      const foundUser = await this.userModel.findById(order.user);

      if (!foundUser) {
        throw new PreconditionFailedException({
          message: 'User not found',
          success: false,
        });
      }

      const foundOrder = await this.orders.findOne({
        user: order.user,
        amount: order.amount,
      });

      if (foundOrder) {
        throw new ConflictException({
          message: 'Order is already created',
          success: false,
        });
      }

      const result = await this.orders.create(order);
      if (!result) {
        throw new UnprocessableEntityException({
          message: 'Unbale to create the user',
          success: false,
        });
      }

      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
