import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

const GEN_SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
  async findUsers(): Promise<User[]> {
    return this.userRepository.findAll({});
  }

  async findUser(userId: string): Promise<User> {
    return this.userRepository.findOne({ userId });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.register(createUserDto);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate({ id }, updateUserDto);
  }

  async register(data: any): Promise<any> {
    const salt = await bcrypt.genSalt(GEN_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const userId = Date.now().toString();

    const newUser = {
      userId: userId,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      profileType: data.profileType,
    };

    return this.userRepository.create(newUser);
  }
}
