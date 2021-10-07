import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './orders.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateOrderDto } from '../../types/orders/CreateOrderDto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async findOne(orderFilterQuery: FilterQuery<OrderDocument>): Promise<Order> {
    return this.orderModel.findOne(orderFilterQuery);
  }

  async findAll(
    ordersFilterQuery: FilterQuery<OrderDocument>,
  ): Promise<Order[]> {
    return this.orderModel.find(ordersFilterQuery);
  }

  async create(orderDto: CreateOrderDto): Promise<OrderDocument> {
    const newOrder = new this.orderModel(orderDto);
    return newOrder.save();
  }

  async findOneAndUpdate(
    orderFilterQuery: FilterQuery<OrderDocument>,
    order: Partial<Order>,
  ): Promise<Order> {
    return this.orderModel.findOneAndUpdate(orderFilterQuery, order, {
      new: true,
    });
  }
}
