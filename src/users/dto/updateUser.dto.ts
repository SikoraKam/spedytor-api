import * as mongoose from 'mongoose';

export class UpdateUserDto {
  name?: string;
  lastName?: string;

  phoneNumber?: string;
  preferredRatePerHour?: string;
  additionalInfo?: string;
  availableStartPlaces?: mongoose.Types.ObjectId[];
}
