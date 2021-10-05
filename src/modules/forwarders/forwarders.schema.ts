import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Order } from '../orders/orders.schema';

export type ForwarderDocument = Forwarder & Document;

@Schema()
export class Forwarder {
  @Prop()
  name: string;

  @Prop()
  lastName: string;
}
