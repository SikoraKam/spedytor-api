import { positionStub } from '../tests/positionStub';

export const PositionRepository = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(positionStub()),
  findAll: jest.fn().mockResolvedValue([positionStub()]),
  create: jest.fn().mockResolvedValue(positionStub()),
  update: jest.fn().mockResolvedValue(positionStub()),
  delete: jest.fn(),
});
