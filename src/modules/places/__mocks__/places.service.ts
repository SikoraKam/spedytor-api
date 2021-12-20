import { placeStub } from '../test/placeStub';

export const PlacesService = jest.fn().mockReturnValue({
  findPlaces: jest.fn().mockResolvedValue([placeStub()]),
  createPlace: jest.fn().mockResolvedValue(placeStub()),
  solveTSP: jest.fn().mockResolvedValue([placeStub(), placeStub()]),
});
