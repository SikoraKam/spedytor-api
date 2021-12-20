import { userStub } from '../../users/test/stubs/user.stub';

export const userWithoutPassword = () => {
  const { password: pass, ...result } = userStub();
  return result;
};

export const accessTokenStub = () => {
  return {
    access_token: 'xxxxxx',
  };
};

export const fakeRequestWithCreateBody = () => {
  return {
    body: {
      name: 'name',
      lastName: 'lastName',
      email: 'mail@example.pl',
      password: '12345',
      profileType: 'dostawca',
    },
  };
};
