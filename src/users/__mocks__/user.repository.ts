import { userStub, userStubWithTypeProvider } from '../test/stubs/user.stub';

export const UserRepository = jest.fn().mockReturnValue({
  findOne: jest.fn().mockResolvedValue(userStubWithTypeProvider()),
  findAll: jest.fn().mockResolvedValue([userStubWithTypeProvider()]),
  create: jest.fn().mockResolvedValue(userStubWithTypeProvider()),
  findOneAndUpdate: jest.fn().mockResolvedValue(userStubWithTypeProvider()),
});
