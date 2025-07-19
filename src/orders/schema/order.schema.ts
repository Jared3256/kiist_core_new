import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User1Schema } from '../../users/user.schema';

@Schema({ timestamps: true })
export class Orders {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User1Schema',
    required: true,
    unique: true,
  })
  user: User1Schema;

  @Prop({
    required: true,
    default: 0,
    min: [1, 'the minimum value you can provide is 1'],
  })
  amount: number;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
