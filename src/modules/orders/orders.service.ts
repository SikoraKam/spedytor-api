import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from './orders.schema';
import * as mongoose from 'mongoose';
import { CreateOrderDto } from '../../types/orders/CreateOrderDto';
import { UpdateOrderDto } from '../../types/orders/UpdateOrderDto';

@Injectable()
export class OrdersService {
  constructor(private orderRepo: OrdersRepository) {}

  async findOrderById(orderId: string): Promise<Order> {
    return this.orderRepo.findOne({
      _id: new mongoose.Types.ObjectId(orderId),
    });
  }

  async findOrdersByForwarderId(
    forwarderId: mongoose.Types.ObjectId,
  ): Promise<Order[]> {
    return this.orderRepo.findAllWithPopulated({
      forwarder: new mongoose.Types.ObjectId(forwarderId),
    });
  }

  async findOrdersByProviderId(
    providerId: mongoose.Types.ObjectId,
  ): Promise<Order[]> {
    return this.orderRepo.findAllWithPopulated({
      provider: new mongoose.Types.ObjectId(providerId),
    });
  }

  async findOrderByIdWithPopulatedPlaces(orderId: string) {
    return this.orderRepo.findOneWithPopulated({
      _id: new mongoose.Types.ObjectId(orderId),
    });
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepo.create(createOrderDto);
  }

  async updateOrder(
    _id: mongoose.Types.ObjectId,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderRepo.findOneAndUpdate({ _id }, updateOrderDto);
  }
}
