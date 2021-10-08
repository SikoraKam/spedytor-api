import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from './places.schema';
import { PlaceController } from './place.controller';
import { PlacesService } from './places.service';
import { PlacesRepository } from './places.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema: PlaceSchema }]),
  ],
  controllers: [PlaceController],
  providers: [PlacesService, PlacesRepository],
})
export class PlacesModule {}
