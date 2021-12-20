import { Test } from '@nestjs/testing';
import { PlaceController } from '../place.controller';
import { PlacesService } from '../places.service';
import { Place } from '../places.schema';
import { placeStub } from './placeStub';
import { CreatePlaceDto } from '../../../types/places/CreatePlaceDto';

jest.mock('../places.service');

describe('PlaceController', () => {
  let controller: PlaceController;
  let service: PlacesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [PlaceController],
      providers: [PlacesService],
    }).compile();
    controller = moduleRef.get<PlaceController>(PlaceController);
    service = moduleRef.get<PlacesService>(PlacesService);
    jest.clearAllMocks();
  });

  describe('getPlaces', () => {
    describe('when getPlaces gets called', () => {
      let places: Place[];

      beforeEach(async () => {
        places = await controller.getPlaces();
      });

      test('then it should call placesService', () => {
        expect(service.findPlaces).toBeCalled();
      });

      test('then it should return places', () => {
        expect(places).toEqual([placeStub()]);
      });
    });
  });

  describe('createPlace', () => {
    describe('when createPlace gets called', () => {
      let place: Place;
      let createPlaceDto: CreatePlaceDto;

      beforeEach(async () => {
        createPlaceDto = {
          name: 'x',
          address: 'y',
          latitude: '20.3',
          longitude: '40.2',
        };
        place = await controller.createPlace(createPlaceDto);
      });

      test('then it should call placesService', () => {
        expect(service.createPlace).toBeCalledWith(createPlaceDto);
      });

      test('then it should return places', () => {
        expect(place).toEqual(placeStub());
      });
    });
  });

  describe('solveTsp', () => {
    describe('when solveTsp gets called', () => {
      let places: Place[];
      let placesBody: Place[];

      beforeEach(async () => {
        placesBody = [placeStub(), placeStub()];
        places = await controller.solveTsp(placesBody);
      });

      test('then it should call placesService', () => {
        expect(service.solveTSP).toBeCalledWith(placesBody);
      });

      test('then it should return places', () => {
        expect(places).toEqual([placeStub(), placeStub()]);
      });
    });
  });
});
