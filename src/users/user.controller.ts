import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Request,
  Delete,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as mongoose from 'mongoose';
import { ProfileType } from '../types/profileType';
import { UpdateUserRatingDto } from '../types/users/updateUserRatingDto';
import { UpdateUserExpoPushToken } from '../types/users/updateUserExpoPushToken';
import { NotificationPayload } from '../types/notifications/notificationPayload';

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

  @UseGuards(JwtAuthGuard)
  @Patch('rating/:userId')
  async updateUserRatingByUserId(
    @Param('userId') userId: mongoose.Types.ObjectId,
    @Body() updateUserRatingBody: UpdateUserRatingDto,
  ): Promise<User> {
    return this.usersService.updateUserRating(userId, updateUserRatingBody);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('notifications/pushToken')
  async updateUserExpoPushTokenByUserId(
    @Request() req,
    @Body() updateUserExpoPushToken: UpdateUserExpoPushToken,
  ): Promise<User> {
    console.log('token OBJECT: : ', updateUserExpoPushToken);
    return this.usersService.updateExpoPushToken(
      req.user.userId,
      updateUserExpoPushToken.expo_token,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('notifications/pushToken')
  async removeExpoPushTokenByUserId(@Request() req): Promise<User> {
    const x = this.usersService.deleteExpoPushToken(req.user.userId);
    console.log('REMOVED: ', x);
    return x;
  }

  @UseGuards(JwtAuthGuard)
  @Post('notifications/pushToken/:userId')
  async sendNotificationToUserById(
    @Param('userId') userId: mongoose.Types.ObjectId,
    @Body() notificationPayload: NotificationPayload,
  ) {
    await this.usersService.sendPushNotification(userId, notificationPayload);
  }
}
