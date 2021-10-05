import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Forwarder } from '../forwarders/forwarders.schema';
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Forwarder' })
  forwarderId: Forwarder;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
