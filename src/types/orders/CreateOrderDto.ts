import * as mongoose from 'mongoose';
import { Forwarder } from '../../modules/forwarders/forwarders.schema';

export class CreateOrderDto {
  dateStart: Date;
  dateEnd: Date;
  placeStart: string;
  placeEnd: string;
  forwarderId: string;
}
