import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const GEN_SALT_ROUNDS = 10;

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  findUserByName = async (username: string): Promise<User | undefined> => {
    return this.users.find((user) => username === user.username);
  };

  async register(data: any): Promise<any> {
    const salt = await bcrypt.genSalt(GEN_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const userId = Date.now();

    this.users.push({
      userId,
      username: data.username,
      password: hashedPassword,
    });
    return true;
  }
}
