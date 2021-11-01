import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Position, PositionDocument } from './position.schema';
import { CreatePositionDto } from '../../types/positions/CreatePositionDto';

@Injectable()
export class PositionRepository {
  constructor(
    @InjectModel(Position.name) private positionModel: Model<PositionDocument>,
  ) {}

  async findOne(
    positionFilterQuery: FilterQuery<PositionDocument>,
  ): Promise<Position> {
    return this.positionModel.findOne(positionFilterQuery).populate('provider');
  }

  async findAll(
    positionFilterQuery: FilterQuery<PositionDocument>,
  ): Promise<PositionDocument[]> {
    return this.positionModel.find(positionFilterQuery).populate('provider');
  }

  async create(positionDto: CreatePositionDto): Promise<PositionDocument> {
    const newPlace = new this.positionModel(positionDto);
    return newPlace.save();
  }

  async update(
    positionFilterQuery: FilterQuery<PositionDocument>,
    position: Partial<Position>,
  ): Promise<PositionDocument> {
    return this.positionModel
      .findOneAndUpdate(positionFilterQuery, position, {
        new: true,
      })
      .populate('provider');
  }

  async delete(positionFilterQuery: FilterQuery<PositionDocument>) {
    const result = await this.positionModel.findByIdAndDelete(
      positionFilterQuery,
    );
    if (!result) {
      throw new NotFoundException();
    }
  }
}
