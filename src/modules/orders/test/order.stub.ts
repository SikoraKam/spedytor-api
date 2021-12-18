import mongoose from 'mongoose';

const mongooseObjectId = new mongoose.Types.ObjectId();

export const orderStub = () => {
  return {
    _id: mongooseObjectId,
    category: 'example',
  };
};
