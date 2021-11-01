import { Injectable } from '@nestjs/common';
import { PositionRepository } from './position.repository';
import { Position } from './position.schema';
import * as mongoose from 'mongoose';
import { CreatePositionDto } from '../../types/positions/CreatePositionDto';
import { UpdatePositionDto } from '../../types/positions/UpdatePositionDto';

@Injectable()
export class PositionService {
  constructor(private positionRepo: PositionRepository) {}

  async findPositionById(positionId: string): Promise<Position> {
    return this.positionRepo.findOne({
      _id: new mongoose.Types.ObjectId(positionId),
    });
  }

  async findPositionByProviderId(
    providerId: mongoose.Types.ObjectId,
  ): Promise<Position> {
    return this.positionRepo.findOne({
      provider: new mongoose.Types.ObjectId(providerId),
    });
  }

  async createPosition(
    createPositionDto: CreatePositionDto,
  ): Promise<Position> {
    return this.positionRepo.create(createPositionDto);
  }

  async updatePositionByProviderId(
    providerId: mongoose.Types.ObjectId,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    return this.positionRepo.update(
      { provider: providerId },
      updatePositionDto,
    );
  }

  async updatePositionById(
    id: mongoose.Types.ObjectId,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    return this.positionRepo.update({ _id: id }, updatePositionDto);
  }
}
