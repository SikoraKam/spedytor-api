import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { FilterQuery, Model } from 'mongoose';
import { ProfileType } from '../types/profileType';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel
      .findOne(userFilterQuery)
      .lean()
      .populate('availableStartPlaces');
  }

  async findAll(usersFilterQuery: FilterQuery<UserDocument>): Promise<User[]> {
    return this.userModel
      .find(usersFilterQuery)
      .lean()
      .populate('availableStartPlaces');
  }

  async create(user: {
    lastName: string;
    password: string;
    profileType: ProfileType;
    name: string;
    email: string;
  }): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<UserDocument>,
    user: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user, {
      new: true,
    });
  }
}
