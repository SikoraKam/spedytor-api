import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Place, PlaceDocument } from './places.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreatePlaceDto } from '../../types/places/CreatePlaceDto';

@Injectable()
export class PlacesRepository {
  constructor(
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
  ) {}

  async findOne(placeFilterQuery: FilterQuery<PlaceDocument>): Promise<Place> {
    return this.placeModel.findOne(placeFilterQuery);
  }

  async findAll(
    placesFilterQuery: FilterQuery<PlaceDocument>,
  ): Promise<Place[]> {
    return this.placeModel.find(placesFilterQuery);
  }

  async create(placeDto: CreatePlaceDto): Promise<PlaceDocument> {
    const newPlace = new this.placeModel(placeDto);
    return newPlace.save();
  }
}
