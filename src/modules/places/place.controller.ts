import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from '../../types/places/CreatePlaceDto';
import { Place } from './places.schema';

@Controller('places')
export class PlaceController {
  constructor(private placesService: PlacesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPlaces() {
    return this.placesService.findPlaces();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPlace(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placesService.createPlace(createPlaceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('tsp')
  async solveTsp(@Body() places: Place[]): Promise<any> {
    return await this.placesService.solveTSP(places);
  }
}
