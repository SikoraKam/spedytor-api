import { Test } from '@nestjs/testing';
import { PositionController } from '../position.controller';
import { PositionService } from '../position.service';
import { Position } from '../position.schema';
import { positionStub } from './positionStub';
import {
  fakeRequestWithUserId,
  userStub,
} from '../../../users/test/stubs/user.stub';

jest.mock('../position.service');

describe('PlaceController', () => {
  let controller: PositionController;
  let service: PositionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [PositionController],
      providers: [PositionService],
    }).compile();
    controller = moduleRef.get<PositionController>(PositionController);
    service = moduleRef.get<PositionService>(PositionService);
    jest.clearAllMocks();
  });

  describe('getPositionById', () => {
    describe('when getPositionById is called', () => {
      let position: Position;

      beforeEach(async () => {
        position = await controller.getPositionById(`${positionStub()._id}`);
      });

      test('then service should be called', () => {
        expect(service.findPositionById).toBeCalledWith(
          `${positionStub()._id}`,
        );
      });

      test('then should return position', () => {
        expect(position).toEqual(positionStub());
      });
    });
  });

  describe('getPositionByProviderId', () => {
    describe('when getPositionByProviderId is called', () => {
      let position: Position;

      beforeEach(async () => {
        position = await controller.getPositionByProviderId(
          positionStub().provider,
        );
      });

      test('then service should be called', () => {
        expect(service.findPositionByProviderId).toBeCalledWith(
          positionStub().provider,
        );
      });

      test('then should return position', () => {
        expect(position).toEqual(positionStub());
      });
    });
  });

  describe('createPosition', () => {
    describe('when createPosition is called', () => {
      let position: Position;
      const createPositionBody = {
        latitude: 50,
        longitude: 20.4,
      };

      beforeEach(async () => {
        position = await controller.createPosition(
          fakeRequestWithUserId(),
          createPositionBody,
        );
      });

      test('then service should be called', () => {
        expect(service.createPosition).toBeCalledWith(
          userStub()._id,
          createPositionBody.latitude,
          createPositionBody.longitude,
        );
      });

      test('then should return position', () => {
        expect(position).toEqual(positionStub());
      });
    });
  });

  describe('updatePositionById', () => {
    describe('when updatePositionById is called', () => {
      let position: Position;
      const updatePositionBody = {
        latitude: 50,
        longitude: 20.4,
      };

      beforeEach(async () => {
        position = await controller.updatePositionById(
          positionStub()._id,
          updatePositionBody,
        );
      });

      test('then service should be called', () => {
        expect(service.updatePositionById).toBeCalledWith(
          positionStub()._id,
          updatePositionBody,
        );
      });

      test('then should return position', () => {
        expect(position).toEqual(positionStub());
      });
    });
  });

  describe('updatePositionByProvider', () => {
    describe('when updatePositionByProvider is called', () => {
      let position: Position;
      const updatePositionBody = {
        latitude: 50,
        longitude: 20.4,
      };

      beforeEach(async () => {
        position = await controller.updatePositionByProvider(
          fakeRequestWithUserId(),
          updatePositionBody,
        );
      });

      test('then service should be called', () => {
        expect(service.updatePositionByProviderId).toBeCalledWith(
          userStub()._id,
          updatePositionBody,
        );
      });

      test('then should return position', () => {
        expect(position).toEqual(positionStub());
      });
    });
  });
});
