import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateOrderDto } from '../../types/orders/CreateOrderDto';
import { Order } from './orders.schema';
import * as mongoose from 'mongoose';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    return this.ordersService.findOrderById(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('forwarder')
  async getOrdersForForwarder(@Request() req) {
    return this.ordersService.findOrdersByForwarderId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('provider')
  async getOrdersForProvider(@Request() req) {
    return this.ordersService.findOrdersByProviderId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('provider/:providerId')
  async getOrdersByProviderId(
    @Param('providerId') providerId: mongoose.Types.ObjectId,
  ) {
    return this.ordersService.findOrdersByProviderId(providerId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('forwarder/:forwarderId')
  async getOrdersByForwarderId(
    @Param('forwarderId') forwarderId: mongoose.Types.ObjectId,
  ) {
    return this.ordersService.findOrdersByForwarderId(forwarderId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }
}
