import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  dateStart: Date;

  @Prop()
  dateEnd: Date;

  @Prop()
  placeStart: string;

  @Prop()
  placeEnd: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  forwarderId: mongoose.Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
