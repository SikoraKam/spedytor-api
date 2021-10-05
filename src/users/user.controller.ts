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
  @Patch(':userId')
  async updateUserById(
    @Param('userId') userId: number,
    @Body() updateUserBody: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserBody);
  }
}
