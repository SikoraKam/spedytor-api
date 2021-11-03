import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreatePositionDto } from '../../types/positions/CreatePositionDto';
import { Position } from './position.schema';
import * as mongoose from 'mongoose';
import { UpdatePositionDto } from '../../types/positions/UpdatePositionDto';

@Controller('positions')
export class PositionController {
  constructor(private positionService: PositionService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':positionId')
  async getPositionById(@Param('positionId') positionId: string) {
    return this.positionService.findPositionById(positionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('provider/:providerId')
  async getPositionByProviderId(
    @Param('providerId') providerId: mongoose.Types.ObjectId,
  ) {
    return this.positionService.findPositionByProviderId(providerId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPosition(
    @Request() req,
    @Body() createPosition: { latitude: number; longitude: number },
  ): Promise<Position> {
    console.log('CREATE');
    return this.positionService.createPosition(
      req.user.userId,
      createPosition.latitude,
      createPosition.longitude,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('positionId/:positionId')
  async updatePositionById(
    @Param('positionId') positionId: mongoose.Types.ObjectId,
    @Body() updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    return this.positionService.updatePositionById(
      positionId,
      updatePositionDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('provider')
  async updatePositionByProvider(
    @Request() req,
    @Body() updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    console.log('UPDATE');
    return this.positionService.updatePositionByProviderId(
      req.user.userId,
      updatePositionDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('provider/:providerId')
  async deletePositionByProviderId(@Param('providerId') providerId: string) {
    await this.positionService.deleteByProviderId(providerId);
  }
}
