import { orderStub } from '../test/order.stub';

export const OrdersService = jest.fn().mockReturnValue({
  findOrderById: jest.fn().mockResolvedValue(orderStub()),
  findOrdersByForwarderId: jest.fn().mockResolvedValue([orderStub()]),
  findOrdersByProviderId: jest.fn().mockResolvedValue([orderStub()]),
  findOrderByIdWithPopulatedPlaces: jest.fn().mockResolvedValue(orderStub()),
  createOrder: jest.fn().mockResolvedValue(orderStub()),
  updateOrder: jest.fn().mockResolvedValue(orderStub()),
});
