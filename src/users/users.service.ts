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
  //
  // async findProvidersWithMatchedStartPlace(
  //   startPlaceId: mongoose.Types.ObjectId,
  // ): Promise<User[]> {
  //   const allProviders = await this.userRepository.findAll({
  //     profileType: ProfileType.Dostawca,
  //   });
  //
  //   const filtered = allProviders.filter((provider) => {
  //     if (
  //       !provider.availableStartPlaces ||
  //       provider.availableStartPlaces.length === 0
  //     ) {
  //       return provider;
  //     }
  //
  //     if (provider.availableStartPlaces.includes(startPlaceId)) {
  //       return provider;
  //     }
  //   });
  //
  //   return filtered;
  // }

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

  async updateExpoPushToken(id: string, token: string): Promise<User> {
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
      'Kliknij aby wyświetlić',
      `Nowa wiadomość od dostawcy ${receiverLastName}`,
      notificationPayload,
    );
  }
}
