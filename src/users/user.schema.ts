import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User1Schema {
  @Prop({ required: true, default: false })
  removed: boolean;

  @Prop({ required: true, default: false })
  enabled: boolean;

  @Prop({ required: true })
  fullname: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ unique: true, required: true })
  regNumber: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  gender: string;
}

export const User1Schemaa = SchemaFactory.createForClass(User1Schema);
