import { FilterQuery } from 'mongoose';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { PositionRepository } from '../position.repository';
import { PositionModel } from './support/position.model';
import { Position, PositionDocument } from '../position.schema';
import { positionStub } from './positionStub';

describe('PositionRepository', () => {
  let repository: PositionRepository;

  describe('find operations', () => {
    let model: PositionModel;
    let filterQuery: FilterQuery<PositionDocument>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          PositionRepository,
          {
            provide: getModelToken(Position.name),
            useClass: PositionModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<PositionRepository>(PositionRepository);
      model = moduleRef.get<PositionModel>(getModelToken(Position.name));

      filterQuery = {
        _id: positionStub()._id,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('when findOne is called', () => {
        let position: Position;

        beforeEach(async () => {
          jest.spyOn(model, 'findOne');
          position = await repository.findOne(filterQuery);
        });

        test('then it should call the positionModel', () => {
          expect(model.findOne).toHaveBeenCalledWith(filterQuery);
        });

        test('then it should return a position', () => {
          expect(position).toEqual(positionStub());
        });
      });
    });

    describe('findAll', () => {
      describe('when findAll is called', () => {
        let positions: Position[];

        beforeEach(async () => {
          jest.spyOn(model, 'find');
          positions = await repository.findAll(filterQuery);
        });

        test('then it should call the positionModel', () => {
          expect(model.find).toHaveBeenCalledWith(filterQuery);
        });

        test('then it should return a positions', () => {
          expect(positions).toEqual([positionStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let position: Position;

        beforeEach(async () => {
          jest.spyOn(model, 'findOneAndUpdate');
          position = await repository.update(filterQuery, positionStub());
        });

        test('then it should call the positionModel', () => {
          expect(model.findOneAndUpdate).toHaveBeenCalledWith(
            filterQuery,
            positionStub(),
            { new: true },
          );
        });

        test('then it should return a position', () => {
          expect(position).toEqual(positionStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          PositionRepository,
          {
            provide: getModelToken(Position.name),
            useValue: PositionModel,
          },
        ],
      }).compile();

      repository = moduleRef.get<PositionRepository>(PositionRepository);
    });

    describe('create', () => {
      describe('when create is called', () => {
        let position: Position;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;
        const positionDto = {
          provider: `${positionStub().provider}`,
          latitude: 50,
          longitude: 23.43,
        };

        beforeEach(async () => {
          saveSpy = jest.spyOn(PositionModel.prototype, 'save');
          constructorSpy = jest.spyOn(
            PositionModel.prototype,
            'constructorSpy',
          );
          position = await repository.create(positionDto);
        });

        test('then it should call the positionModel', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(positionDto);
        });

        test('then it should return a position', () => {
          expect(position).toEqual(positionStub());
        });
      });
    });
  });
});
