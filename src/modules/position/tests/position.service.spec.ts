import { Test } from '@nestjs/testing';
import { Position } from '../position.schema';
import { PositionService } from '../position.service';
import { PositionRepository } from '../position.repository';
import { positionStub } from './positionStub';

jest.mock('../position.repository');

describe('PositionService', () => {
  let service: PositionService;
  let repository: PositionRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PositionRepository, PositionService],
    }).compile();
    service = moduleRef.get<PositionService>(PositionService);
    repository = moduleRef.get<PositionRepository>(PositionRepository);
    jest.clearAllMocks();
  });

  describe('findPositionById', () => {
    describe('when findPositionById is called', () => {
      let position: Position;

      beforeEach(async () => {
        position = await service.findPositionById(`${positionStub()._id}`);
      });

      test('then it should call placesRepo', () => {
        expect(repository.findOne).toBeCalledWith({
          _id: positionStub()._id,
        });
      });

      test('then it should return places', () => {
        expect(position).toEqual(positionStub());
      });
    });
  });

  describe('findPositionByProviderId', () => {
    describe('when findPositionByProviderId is called', () => {
      let position: Position;

      beforeEach(async () => {
        position = await service.findPositionByProviderId(
          positionStub().provider,
        );
      });

      test('then it should call placesRepo', () => {
        expect(repository.findOne).toBeCalledWith({
          provider: positionStub().provider,
        });
      });

      test('then it should return places', () => {
        expect(position).toEqual(positionStub());
      });
    });
  });

  describe('createPosition', () => {
    describe('when createPosition is called', () => {
      let position: Position;

      beforeEach(async () => {
        position = await service.createPosition(
          `${positionStub().provider}`,
          50.3,
          24.4,
        );
      });

      test('then it should call placesRepo', () => {
        expect(repository.create).toBeCalledWith({
          provider: `${positionStub().provider}`,
          latitude: 50.3,
          longitude: 24.4,
        });
      });

      test('then it should return places', () => {
        expect(position).toEqual(positionStub());
      });
    });
  });

  describe('updatePositionByProviderId', () => {
    describe('when updatePositionByProviderId is called', () => {
      let position: Position;
      const updatePositionDto = { latitude: 50.3, longitude: 24.4 };

      beforeEach(async () => {
        position = await service.updatePositionByProviderId(
          `${positionStub().provider}`,
          updatePositionDto,
        );
      });

      test('then it should call placesRepo', () => {
        expect(repository.update).toBeCalledWith(
          {
            provider: positionStub().provider,
          },
          updatePositionDto,
        );
      });

      test('then it should return places', () => {
        expect(position).toEqual(positionStub());
      });
    });
  });

  describe('updatePositionById', () => {
    describe('when updatePositionById is called', () => {
      let position: Position;
      const updatePositionDto = { latitude: 50.3, longitude: 24.4 };

      beforeEach(async () => {
        position = await service.updatePositionById(
          positionStub()._id,
          updatePositionDto,
        );
      });

      test('then it should call placesRepo', () => {
        expect(repository.update).toBeCalledWith(
          {
            _id: positionStub()._id,
          },
          updatePositionDto,
        );
      });

      test('then it should return places', () => {
        expect(position).toEqual(positionStub());
      });
    });
  });

  describe('deleteByProviderId', () => {
    describe('when deleteByProviderId is called', () => {
      beforeEach(async () => {
        await service.deleteByProviderId(`${positionStub().provider}`);
      });

      test('then it should call placesRepo', () => {
        expect(repository.delete).toBeCalledWith({
          provider: positionStub().provider,
        });
      });
    });
  });
});
