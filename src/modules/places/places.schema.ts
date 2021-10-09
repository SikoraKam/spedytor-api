import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PlaceDocument = Place & Document;

@Schema()
export class Place {
  @Prop()
  name: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
