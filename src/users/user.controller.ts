import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as mongoose from 'mongoose';
import { ProfileType } from '../types/profileType';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Request() req) {
    return this.usersService.findUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('providers')
  async getProviders(): Promise<User[]> {
    return this.usersService.findUsersByType(ProfileType.Dostawca);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId')
  async updateUserById(
    @Param('userId') userId: mongoose.Types.ObjectId,
    @Body() updateUserBody: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserBody);
  }
}
