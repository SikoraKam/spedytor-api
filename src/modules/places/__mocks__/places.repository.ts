import { placeStub } from '../test/placeStub';

export const PlacesRepository = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(placeStub()),
  findAll: jest.fn().mockResolvedValue([placeStub()]),
  create: jest.fn().mockResolvedValue(placeStub()),
});
