import { Injectable } from '@nestjs/common';
import { PlacesRepository } from './places.repository';
import { Place } from './places.schema';
import { CreatePlaceDto } from '../../types/places/CreatePlaceDto';
import { TravellingSalesman } from '../../helpers/TravellingSalesman';

@Injectable()
export class PlacesService {
  constructor(private placeRepo: PlacesRepository) {}

  async findPlaces(): Promise<Place[]> {
    return this.placeRepo.findAll({});
  }

  async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placeRepo.create(createPlaceDto);
  }

  async solveTSP(placesArray: Place[]): Promise<any> {
    const tsp = new TravellingSalesman(placesArray);
    return tsp.travellingSalesmanProblem();
  }
}
