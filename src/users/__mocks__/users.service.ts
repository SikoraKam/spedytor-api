import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  findUserByEmail: jest.fn().mockResolvedValue(userStub()),
  findUsers: jest.fn().mockResolvedValue([userStub()]),
  findUsersByType: jest.fn().mockResolvedValue([userStub()]),
  findUser: jest.fn().mockResolvedValue(userStub()),
  createUser: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
  updateUserRating: jest.fn().mockResolvedValue(userStub()),
  updateUserResetCode: jest.fn().mockResolvedValue(userStub()),
  updateExpoPushToken: jest.fn().mockResolvedValue(userStub()),
  deleteExpoPushToken: jest.fn().mockResolvedValue(userStub()),
});
