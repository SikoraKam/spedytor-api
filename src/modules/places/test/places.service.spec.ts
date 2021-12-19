import { Test } from '@nestjs/testing';
import { PlacesService } from '../places.service';
import { PlacesRepository } from '../places.repository';
import { Place } from '../places.schema';
import { placeStub } from './placeStub';
import { CreatePlaceDto } from '../../../types/places/CreatePlaceDto';

jest.mock('../places.repository');

describe('PlacesService', () => {
  let service: PlacesService;
  let repository: PlacesRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PlacesRepository, PlacesService],
    }).compile();
    service = moduleRef.get<PlacesService>(PlacesService);
    repository = moduleRef.get<PlacesRepository>(PlacesRepository);
    jest.clearAllMocks();
  });

  describe('findPlaces', () => {
    describe('when findPlaces is called', () => {
      let places: Place[];

      beforeEach(async () => {
        places = await service.findPlaces();
      });

      test('then it should call placesRepo', () => {
        expect(repository.findAll).toBeCalledWith({});
      });

      test('then it should return places', () => {
        expect(places).toEqual([placeStub()]);
      });
    });
  });

  describe('createPlace', () => {
    describe('when createPlace is called', () => {
      let place: Place;
      let createPlaceDto: CreatePlaceDto;

      beforeEach(async () => {
        createPlaceDto = {
          name: 'x',
          address: 'y',
          latitude: '20.3',
          longitude: '40.2',
        };
        place = await service.createPlace(createPlaceDto);
      });

      test('then it should call placesRepo', () => {
        expect(repository.create).toBeCalledWith(createPlaceDto);
      });

      test('then it should return places', () => {
        expect(place).toEqual(placeStub());
      });
    });
  });

  describe('solveTSP', () => {
    describe('when solveTSP is called', () => {
      let places: Place[];

      beforeEach(async () => {
        places = await service.solveTSP([placeStub()]);
      });

      test('then it should return places', () => {
        expect(places).toEqual([placeStub(), placeStub()]);
      });
    });
  });
});
