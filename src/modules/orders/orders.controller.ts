import {
  Controller,
  Get,
  Injectable,
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

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    return this.ordersService.findOrderById(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrdersByUserId(@Request() req) {
    return this.ordersService.findOrdersFromUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }
}
