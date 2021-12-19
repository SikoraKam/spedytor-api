import { Test } from '@nestjs/testing';
import { OrdersService } from '../orders.service';
import { OrdersRepository } from '../orders.repository';
import { Order } from '../orders.schema';
import { orderStub, orderStubForCreate } from './order.stub';
import { CreateOrderDto } from '../../../types/orders/CreateOrderDto';
import { UpdateOrderDto } from '../../../types/orders/UpdateOrderDto';
import { OrderStatus } from '../../../types/orders/OrderStatus';

jest.mock('../orders.repository');

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let ordersRepository: OrdersRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [OrdersRepository, OrdersService],
    }).compile();
    ordersService = moduleRef.get<OrdersService>(OrdersService);
    ordersRepository = moduleRef.get<OrdersRepository>(OrdersRepository);
    jest.clearAllMocks();
  });

  describe('findOrderById', () => {
    describe('when findOrderById gets called', () => {
      let order: Order;

      beforeEach(async () => {
        order = await ordersService.findOrderById(`${orderStub()._id}`);
      });

      test('then it should call orderRepo', () => {
        expect(ordersRepository.findOne).toBeCalledWith({
          _id: orderStub()._id,
        });
      });

      test('then it should return order', () => {
        expect(order).toEqual(orderStub());
      });
    });
  });

  describe('findOrderByIdWithPopulatedPlaces', () => {
    describe('when findOrderByIdWithPopulatedPlaces gets called', () => {
      let order: Order;

      beforeEach(async () => {
        order = await ordersService.findOrderByIdWithPopulatedPlaces(
          `${orderStub()._id}`,
        );
      });

      test('then it should call orderRepo', () => {
        expect(ordersRepository.findOneWithPopulated).toBeCalledWith({
          _id: orderStub()._id,
        });
      });

      test('then it should return order', () => {
        expect(order).toEqual(orderStub());
      });
    });
  });

  describe('findOrdersByForwarderId', () => {
    describe('when findOrdersByForwarderId gets called', () => {
      let orders: Order[];

      beforeEach(async () => {
        orders = await ordersService.findOrdersByForwarderId(
          orderStub().forwarder,
        );
      });

      test('then it should call orderRepo', () => {
        expect(ordersRepository.findAllWithPopulated).toBeCalledWith({
          forwarder: orderStub().forwarder,
        });
      });

      test('then it should return order', () => {
        expect(orders).toEqual([orderStub()]);
      });
    });
  });

  describe('findOrdersByProviderId', () => {
    describe('when findOrdersByProviderId gets called', () => {
      let orders: Order[];

      beforeEach(async () => {
        orders = await ordersService.findOrdersByProviderId(
          orderStub().provider,
        );
      });

      test('then it should call orderRepo', () => {
        expect(ordersRepository.findAllWithPopulated).toBeCalledWith({
          provider: orderStub().provider,
        });
      });

      test('then it should return order', () => {
        expect(orders).toEqual([orderStub()]);
      });
    });
  });

  describe('createOrder', () => {
    describe('when createOrder gets called', () => {
      let order: Order;
      let createOrderDto: CreateOrderDto;

      beforeEach(async () => {
        createOrderDto = orderStubForCreate();
        order = await ordersService.createOrder(createOrderDto);
      });

      test('then it should call orderRepo', () => {
        expect(ordersRepository.create).toBeCalledWith(createOrderDto);
      });

      test('then it should return order', () => {
        expect(order).toEqual(orderStub());
      });
    });
  });

  describe('updateOrder', () => {
    describe('when updateOrder gets called', () => {
      let order: Order;
      let updateOrderDto: UpdateOrderDto;

      beforeEach(async () => {
        updateOrderDto = {
          orderStatus: OrderStatus.ACCEPTED,
        };
        order = await ordersService.updateOrder(
          orderStub()._id,
          updateOrderDto,
        );
      });

      test('then it should call orderRepo', () => {
        expect(ordersRepository.findOneAndUpdate).toBeCalledWith(
          { _id: orderStub()._id },
          updateOrderDto,
        );
      });

      test('then it should return order', () => {
        expect(order).toEqual(orderStub());
      });
    });
  });
});
