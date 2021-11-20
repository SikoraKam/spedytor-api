import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProfileType } from '../types/profileType';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: ProfileType })
  profileType: ProfileType;

  @Prop()
  marks: number[];

  @Prop()
  rating: number;

  @Prop()
  expo_token: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  preferredRatePerHour: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }])
  availableStartPlaces: mongoose.Types.ObjectId[];

  @Prop()
  additionalInfo: string;

  @Prop()
  code: string;
  @Prop()
  created_timestamp: number;
  @Prop()
  expire_timestamp: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
