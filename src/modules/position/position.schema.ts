import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PositionDocument = Position & Document;

@Schema()
export class Position {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  provider: mongoose.Types.ObjectId;
}

export const PositionSchema = SchemaFactory.createForClass(Position);
