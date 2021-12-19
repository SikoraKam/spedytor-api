import { orderStub } from '../test/order.stub';

export const OrdersRepository = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(orderStub()),
  findAll: jest.fn().mockResolvedValue([orderStub()]),
  findAllWithPopulated: jest.fn().mockResolvedValue([orderStub()]),
  findOneWithPopulated: jest.fn().mockResolvedValue(orderStub()),
  create: jest.fn().mockResolvedValue(orderStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(orderStub()),
});
