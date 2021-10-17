import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { OrderStatus } from '../../types/orders/OrderStatus';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  dateStart: Date;

  @Prop()
  dateEnd: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  forwarderId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  providerId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Place' })
  placeStart: mongoose.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }])
  destinations: mongoose.Types.ObjectId[];

  @Prop({ type: String, enum: OrderStatus })
  orderStatus: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
