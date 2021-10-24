import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
  @Post('distances')
  async getDistances(@Body() places: Place[]): Promise<any> {
    const x = await this.placesService.generateDistances(places);
    console.log(x);
    return x;
  }
}
