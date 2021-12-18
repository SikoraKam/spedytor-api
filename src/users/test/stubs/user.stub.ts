import { ProfileType } from '../../../types/profileType';
import * as mongoose from 'mongoose';

const mongooseObjectId = new mongoose.Types.ObjectId();

export const userStub = () => {
  return {
    _id: mongooseObjectId,
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'email@test.com',
    profileType: ProfileType.Spedytor,
    password: 'xxxxx',
    marks: [5, 4],
    rating: 4.5,
    expo_token: '434',
    preferredRatePerHour: '50',
    availableStartPlaces: [mongooseObjectId],
    additionalInfo: '',
    code: '12345',
    phoneNumber: '',
    created_timestamp: 0,
    expire_timestamp: 999999999999999999,
  };
};

export const userStubWithTypeProvider = () => {
  return { ...userStub(), profileType: ProfileType.Dostawca };
};

export const fakeRequestWithUserId = () => {
  return {
    user: {
      userId: userStub()._id,
    },
  };
};

export const userStubWithOutdatedCode = () => {
  return {
    _id: mongooseObjectId,
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'email@test.com',
    profileType: ProfileType.Spedytor,
    password: 'xxxxx',
    marks: [5, 4],
    rating: 4.5,
    expo_token: '434',
    preferredRatePerHour: '50',
    availableStartPlaces: [mongooseObjectId],
    additionalInfo: '',
    code: '12345',
    phoneNumber: '',
    created_timestamp: 0,
    expire_timestamp: '',
  };
};
