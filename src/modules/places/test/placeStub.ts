import * as mongoose from 'mongoose';

const mongooseObjectId = new mongoose.Types.ObjectId();

export const placeStub = () => {
  return {
    _id: mongooseObjectId,
    name: 'name',
    address: 'address',
    latitude: 50.789,
    longitude: 23.0909,
  };
};
