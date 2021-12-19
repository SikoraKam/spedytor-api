import { positionStub } from '../tests/positionStub';

export const PositionService = jest.fn().mockReturnValue({
  findPositionById: jest.fn().mockResolvedValue(positionStub()),
  findPositionByProviderId: jest.fn().mockResolvedValue(positionStub()),
  createPosition: jest.fn().mockResolvedValue(positionStub()),
  updatePositionByProviderId: jest.fn().mockResolvedValue(positionStub()),
  updatePositionById: jest.fn().mockResolvedValue(positionStub()),
  deleteByProviderId: jest.fn(),
});
