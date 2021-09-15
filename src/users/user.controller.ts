import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get(':userId')
  async getUserById(@Param('userId') userId: number): Promise<User> {
    return this.usersService.findUserById(userId);
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findUserByEmail(email);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findUsers();
  }

  @Patch(':userId')
  async updateUserById(
    @Param('userId') userId: number,
    @Body() updateUserBody: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserBody);
  }
}
