import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Position, PositionSchema } from './position.schema';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { PositionRepository } from './position.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Position.name, schema: PositionSchema },
    ]),
  ],
  controllers: [PositionController],
  providers: [PositionService, PositionRepository],
})
export class PositionModule {}
