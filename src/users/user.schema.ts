import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProfileType } from '../types/profileType';
import mongoose from 'mongoose';

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

  @Prop()
  preferredStartPlaces: string;

  @Prop()
  additionalInfo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
