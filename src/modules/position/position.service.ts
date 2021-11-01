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
    providerId: string,
    latitude: number,
    longitude: number,
  ): Promise<Position> {
    return this.positionRepo.create({
      provider: providerId,
      latitude,
      longitude,
    });
  }

  async updatePositionByProviderId(
    providerId: string,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    return this.positionRepo.update(
      { provider: new mongoose.Types.ObjectId(providerId) },
      updatePositionDto,
    );
  }

  async updatePositionById(
    id: mongoose.Types.ObjectId,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    return this.positionRepo.update({ _id: id }, updatePositionDto);
  }

  async deleteById(id: mongoose.Types.ObjectId) {
    await this.positionRepo.delete({ _id: id });
  }

  async deleteByProviderId(providerId: mongoose.Types.ObjectId) {
    await this.positionRepo.delete({
      provider: new mongoose.Types.ObjectId(providerId),
    });
  }
}
