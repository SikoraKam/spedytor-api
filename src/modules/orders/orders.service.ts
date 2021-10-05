import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from './orders.schema';
import * as mongoose from 'mongoose';
import { CreateOrderDto } from '../../types/orders/CreateOrderDto';

@Injectable()
export class OrdersService {
  constructor(private orderRepo: OrdersRepository) {}

  async findOrderById(orderId: string): Promise<Order> {
    return this.orderRepo.findOne({
      _id: new mongoose.Types.ObjectId(orderId),
    });
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepo.create(createOrderDto);
  }
}
