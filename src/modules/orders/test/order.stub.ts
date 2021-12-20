import * as mongoose from 'mongoose';
import { OrderStatus } from '../../../types/orders/OrderStatus';

const mongooseObjectId = new mongoose.Types.ObjectId();
const mongooseObjectIdForwarder = new mongoose.Types.ObjectId();
const mongooseObjectIdProvider = new mongoose.Types.ObjectId();
const mongooseObjectIdPlaceStart = new mongoose.Types.ObjectId();
const mongooseObjectIdDestination = new mongoose.Types.ObjectId();

export const orderStub = () => {
  return {
    _id: mongooseObjectId,
    dateStart: new Date(2021, 12, 18),
    dateEnd: new Date(2021, 12, 19),
    forwarder: mongooseObjectIdForwarder,
    provider: mongooseObjectIdProvider,
    placeStart: mongooseObjectIdPlaceStart,
    destinations: [mongooseObjectIdDestination],
    orderStatus: OrderStatus.WAITING,
    category: '',
    weightInKg: 50,
    description: '',
    incoterm: '',
    truckType: '',
  };
};

export const orderStubForCreate = () => {
  return {
    dateStart: new Date(2021, 12, 18),
    dateEnd: new Date(2021, 12, 19),
    forwarder: `${mongooseObjectIdForwarder}`,
    provider: `${mongooseObjectIdProvider}`,
    placeStart: `${mongooseObjectIdPlaceStart}`,
    destinations: [`${mongooseObjectIdDestination}`],
    category: '',
    weightInKg: '',
    description: '',
    incoterm: '',
    truckType: '',
  };
};
