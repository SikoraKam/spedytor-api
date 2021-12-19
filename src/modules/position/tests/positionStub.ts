import * as mongoose from 'mongoose';
import { userStub } from '../../../users/test/stubs/user.stub';

const mongooseObjectId = new mongoose.Types.ObjectId();

export const positionStub = () => {
  return {
    _id: mongooseObjectId,
    latitude: 23.54,
    longitude: 32.32,
    provider: userStub()._id,
  };
};
