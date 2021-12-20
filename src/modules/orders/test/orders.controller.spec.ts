import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { Test } from '@nestjs/testing';
import { Order } from '../orders.schema';
import { orderStub, orderStubForCreate } from './order.stub';
import {
  fakeRequestWithUserId,
  userStub,
} from '../../../users/test/stubs/user.stub';
import { CreateOrderDto } from '../../../types/orders/CreateOrderDto';
import { UpdateOrderDto } from '../../../types/orders/UpdateOrderDto';
import { OrderStatus } from '../../../types/orders/OrderStatus';

jest.mock('../orders.service');

describe('OrderController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();
    ordersController = moduleRef.get<OrdersController>(OrdersController);
    ordersService = moduleRef.get<OrdersService>(OrdersService);
    jest.clearAllMocks();
  });

  describe('getOrderById', () => {
    describe('when getOrderById gets called', () => {
      let order: Order;

      beforeEach(async () => {
        order = await ordersController.getOrderById(`${orderStub()._id}`);
      });
      test('then it should call ordersService', () => {
        expect(ordersService.findOrderById).toBeCalledWith(
          `${orderStub()._id}`,
        );
      });

      test('then it should return order', () => {
        expect(order).toEqual(orderStub());
      });
    });
  });

  describe('getOrdersForForwarder', () => {
    describe('when getOrdersForForwarder gets called', () => {
      let orders: Order[];

      beforeEach(async () => {
        orders = await ordersController.getOrdersForForwarder(
          fakeRequestWithUserId(),
        );
      });
      test('then it should call ordersService', () => {
        expect(ordersService.findOrdersByForwarderId).toBeCalledWith(
          userStub()._id,
        );
      });

      test('then it should return order', () => {
        expect(orders).toEqual([orderStub()]);
      });
    });
  });

  describe('getOrdersForProvider', () => {
    describe('when getOrdersForProvider gets called', () => {
      let orders: Order[];

      beforeEach(async () => {
        orders = await ordersController.getOrdersForProvider(
          fakeRequestWithUserId(),
        );
      });
      test('then it should call ordersService', () => {
        expect(ordersService.findOrdersByProviderId).toBeCalledWith(
          userStub()._id,
        );
      });

      test('then it should return order', () => {
        expect(orders).toEqual([orderStub()]);
      });
    });
  });

  describe('getOrdersByProviderId', () => {
    describe('when getOrdersByProviderId gets called', () => {
      let orders: Order[];

      beforeEach(async () => {
        orders = await ordersController.getOrdersByProviderId(userStub()._id);
      });
      test('then it should call ordersService', () => {
        expect(ordersService.findOrdersByProviderId).toBeCalledWith(
          userStub()._id,
        );
      });

      test('then it should return order', () => {
        expect(orders).toEqual([orderStub()]);
      });
    });
  });

  describe('getOrdersByForwarderId', () => {
    describe('when getOrdersByForwarderId gets called', () => {
      let orders: Order[];

      beforeEach(async () => {
        orders = await ordersController.getOrdersByForwarderId(userStub()._id);
      });
      test('then it should call ordersService', () => {
        expect(ordersService.findOrdersByForwarderId).toBeCalledWith(
          userStub()._id,
        );
      });

      test('then it should return order', () => {
        expect(orders).toEqual([orderStub()]);
      });
    });
  });

  describe('getOrderByIdWithPopulatedPlaces', () => {
    describe('when getOrderByIdWithPopulatedPlaces gets called', () => {
      let order: Order;

      beforeEach(async () => {
        order = await ordersController.getOrderByIdWithPopulatedPlaces(
          `${orderStub()._id}`,
        );
      });
      test('then it should call ordersService', () => {
        expect(ordersService.findOrderByIdWithPopulatedPlaces).toBeCalledWith(
          `${orderStub()._id}`,
        );
      });

      test('then it should return order', () => {
        expect(order).toEqual(orderStub());
      });
    });
  });

  describe('createOrder', () => {
    describe('when createOrder gets called', () => {
      let order: Order;
      let createOrderDto: CreateOrderDto;
      beforeEach(async () => {
        createOrderDto = orderStubForCreate();
        order = await ordersController.createOrder(createOrderDto);
      });
      test('then it should call ordersService', () => {
        expect(ordersService.createOrder).toBeCalledWith(createOrderDto);
      });

      test('then it should return order', () => {
        expect(order).toEqual(orderStub());
      });
    });
  });

  describe('updateOrderById', () => {
    describe('when updateOrderById gets called', () => {
      let order: Order;
      let updateOrderDto: UpdateOrderDto;
      beforeEach(async () => {
        updateOrderDto = {
          orderStatus: OrderStatus.ACCEPTED,
        };
        order = await ordersController.updateOrderById(
          orderStub()._id,
          updateOrderDto,
        );
      });
      test('then it should call ordersService', () => {
        expect(ordersService.updateOrder).toBeCalledWith(
          orderStub()._id,
          updateOrderDto,
        );
      });

      test('then it should return order', () => {
        expect(order).toEqual(orderStub());
      });
    });
  });
});
