import { FilterQuery } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Order, OrderDocument } from '../orders.schema';
import { OrderModel } from './support/order.model';
import { OrdersRepository } from '../orders.repository';
import { orderStub, orderStubForCreate } from './order.stub';

describe('OrdersRepository', () => {
  let ordersRepository: OrdersRepository;

  describe('find operations', () => {
    let orderModel: OrderModel;
    let orderFilterQuery: FilterQuery<OrderDocument>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          OrdersRepository,
          {
            provide: getModelToken(Order.name),
            useClass: OrderModel,
          },
        ],
      }).compile();

      ordersRepository = moduleRef.get<OrdersRepository>(OrdersRepository);
      orderModel = moduleRef.get<OrderModel>(getModelToken(Order.name));

      orderFilterQuery = {
        _id: orderStub()._id,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let order: Order;

        beforeEach(async () => {
          jest.spyOn(orderModel, 'findOne');
          order = await ordersRepository.findOne(orderFilterQuery);
        });

        test('then it should call the orderModel', () => {
          expect(orderModel.findOne).toHaveBeenCalledWith(orderFilterQuery);
        });

        test('then it should return a order', () => {
          expect(order).toEqual(orderStub());
        });
      });
    });

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let orders: Order[];

        beforeEach(async () => {
          jest.spyOn(orderModel, 'find');
          orders = await ordersRepository.findAll(orderFilterQuery);
        });

        test('then it should call the orderModel', () => {
          expect(orderModel.find).toHaveBeenCalledWith(orderFilterQuery);
        });

        test('then it should return a orders', () => {
          expect(orders).toEqual([orderStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let order: Order;

        beforeEach(async () => {
          jest.spyOn(orderModel, 'findOneAndUpdate');
          order = await ordersRepository.findOneAndUpdate(
            orderFilterQuery,
            orderStub(),
          );
        });

        test('then it should call the orderModel', () => {
          expect(
            orderModel.findOneAndUpdate,
          ).toHaveBeenCalledWith(orderFilterQuery, orderStub(), { new: true });
        });

        test('then it should return a order', () => {
          expect(order).toEqual(orderStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          OrdersRepository,
          {
            provide: getModelToken(Order.name),
            useValue: OrderModel,
          },
        ],
      }).compile();

      ordersRepository = moduleRef.get<OrdersRepository>(OrdersRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let order: Order;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(OrderModel.prototype, 'save');
          constructorSpy = jest.spyOn(OrderModel.prototype, 'constructorSpy');
          order = await ordersRepository.create(orderStubForCreate());
        });

        test('then it should call the orderModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(orderStubForCreate());
        });

        test('then it should return a oder', () => {
          expect(order).toEqual(orderStub());
        });
      });
    });
  });
});
