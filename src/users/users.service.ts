import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as mongoose from 'mongoose';
import { ProfileType } from '../types/profileType';
import { UpdateUserRatingDto } from '../types/users/updateUserRatingDto';
import { NotificationPayload } from '../types/notifications/notificationPayload';
import { sendPushNotificationViaExpoSdk } from '../helpers/expoPushNotification';

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

  async findUsersByType(profileType: ProfileType): Promise<User[]> {
    return this.userRepository.findAll({ profileType });
  }

  async findUser(userId: mongoose.Types.ObjectId): Promise<User> {
    return this.userRepository.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.register(createUserDto);
  }

  async updateUser(
    _id: mongoose.Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userRepository.findOneAndUpdate({ _id }, updateUserDto);
  }

  async updateUserRating(
    _id: mongoose.Types.ObjectId,
    updateUserDto: UpdateUserRatingDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ _id });
    if (user.profileType === ProfileType.Spedytor) {
      throw new HttpException('Wrong profileType', HttpStatus.FORBIDDEN);
    }

    const { marks } = user;
    marks.push(updateUserDto.mark);
    const arrAvg = marks.reduce((a, b) => a + b, 0) / marks.length;

    const updateUserRatingObject = {
      marks: marks,
      rating: arrAvg,
    };
    return this.userRepository.findOneAndUpdate(
      { _id },
      updateUserRatingObject,
    );
  }

  async updateUserResetCode(
    userId: mongoose.Types.ObjectId,
    resetData: {
      code: string;
      expire_timestamp: number;
      created_timestamp: number;
    },
  ) {
    return this.userRepository.findOneAndUpdate({ _id: userId }, resetData);
  }

  async register(data: any): Promise<any> {
    const salt = await bcrypt.genSalt(GEN_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newUser = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      profileType: data.profileType,
    };

    return this.userRepository.create(newUser);
  }

  async updatePassword(
    code: string,
    password: string,
    email: string,
  ): Promise<any> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Nie znaleziono u??ytkownika z podanym mailem',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const id = user._id;

    if (Date.now() > user.expire_timestamp) {
      await this.userRepository.findOneAndUpdate(
        { _id: id },
        { code: '', expire_timestamp: 0, created_timestamp: 0 },
      );
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Przedawniony kod',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (user.code !== code) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Z??y kod',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const salt = await bcrypt.genSalt(GEN_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    await this.userRepository.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword },
    );
    return this.userRepository.findOneAndUpdate(
      { _id: id },
      { code: '', expire_timestamp: 0, created_timestamp: 0 },
    );
  }

  async updateExpoPushToken(id: string, token: string): Promise<any> {
    return this.userRepository.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { expo_token: token },
    );
  }

  async deleteExpoPushToken(id: string): Promise<User> {
    return this.userRepository.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { expo_token: '' },
    );
  }

  async sendPushNotification(
    receiverId: mongoose.Types.ObjectId,
    notificationPayload: NotificationPayload,
  ) {
    const receiver = await this.userRepository.findOne({ _id: receiverId });
    const receiverPushToken = receiver.expo_token;
    const receiverLastName = receiver.lastName;
    await sendPushNotificationViaExpoSdk(
      receiverPushToken,
      'Kliknij aby wy??wietli??',
      `Nowa wiadomo???? od dostawcy ${receiverLastName}`,
      notificationPayload,
    );
  }
}
