import { accessTokenStub, userWithoutPassword } from '../tests/auth.stub';
import { userStub } from '../../users/test/stubs/user.stub';

export const AuthService = jest.fn().mockReturnValue({
  validateUser: jest.fn().mockResolvedValue(userWithoutPassword()),
  login: jest.fn().mockResolvedValue(accessTokenStub()),
  register: jest.fn().mockResolvedValue(userStub()),
  updatePassword: jest.fn().mockResolvedValue(userStub()),
  sendCode: jest.fn().mockResolvedValue(true),
});
