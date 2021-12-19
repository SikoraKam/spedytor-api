import { FilterQuery } from 'mongoose';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PlacesRepository } from '../places.repository';
import { PlaceModel } from './support/place.model';
import { Place, PlaceDocument } from '../places.schema';
import { placeStub } from './placeStub';

describe('PlaceRepository', () => {
  let repository: PlacesRepository;

  describe('find operations', () => {
    let model: PlaceModel;
    let filterQuery: FilterQuery<PlaceDocument>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          PlacesRepository,
          {
            provide: getModelToken(Place.name),
            useClass: PlaceModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<PlacesRepository>(PlacesRepository);
      model = moduleRef.get<PlaceModel>(getModelToken(Place.name));

      filterQuery = {
        _id: placeStub()._id,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let place: Place;

        beforeEach(async () => {
          jest.spyOn(model, 'findOne');
          place = await repository.findOne(filterQuery);
        });

        test('then it should call the placeModel', () => {
          expect(model.findOne).toHaveBeenCalledWith(filterQuery);
        });

        test('then it should return a place', () => {
          expect(place).toEqual(placeStub());
        });
      });
    });

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let places: Place[];

        beforeEach(async () => {
          jest.spyOn(model, 'find');
          places = await repository.findAll(filterQuery);
        });

        test('then it should call the placeModel', () => {
          expect(model.find).toHaveBeenCalledWith(filterQuery);
        });

        test('then it should return a places', () => {
          expect(places).toEqual([placeStub()]);
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          PlacesRepository,
          {
            provide: getModelToken(Place.name),
            useValue: PlaceModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<PlacesRepository>(PlacesRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let place: Place;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;
        const placeDto = {
          name: 'x',
          address: 'y',
          latitude: '50',
          longitude: '23.43',
        };

        beforeEach(async () => {
          saveSpy = jest.spyOn(PlaceModel.prototype, 'save');
          constructorSpy = jest.spyOn(PlaceModel.prototype, 'constructorSpy');
          place = await repository.create(placeDto);
        });

        test('then it should call the placeModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(placeDto);
        });

        test('then it should return a place', () => {
          expect(place).toEqual(placeStub());
        });
      });
    });
  });
});
