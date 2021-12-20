import { Test } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AuthService } from '../auth/auth.service';
import { fakeRequestWithUserId, userStub } from '../users/test/stubs/user.stub';
import {
  accessTokenStub,
  fakeRequestWithCreateBody,
} from '../auth/tests/auth.stub';
import { User } from '../users/user.schema';

jest.mock('../auth/auth.service');

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [AuthService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    authService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('login', () => {
    describe('when login is called', () => {
      let token: string;

      beforeEach(async () => {
        token = await appController.login(fakeRequestWithUserId());
      });

      test('then it should call authService', () => {
        expect(authService.login).toBeCalledWith(fakeRequestWithUserId().user);
      });

      test('then it should return access token', () => {
        expect(token).toEqual(accessTokenStub());
      });
    });
  });

  describe('getProfile', () => {
    describe('when getProfile is called', () => {
      let token: string;

      beforeEach(async () => {
        token = await appController.getProfile(fakeRequestWithUserId());
      });

      test('then it should return user', () => {
        expect(token).toEqual(fakeRequestWithUserId().user);
      });
    });
  });

  describe('register', () => {
    describe('when register is called', () => {
      let user: User;
      const createBody = {
        name: 'name',
        lastName: 'lastName',
        email: 'mail@example.pl',
        password: '12345',
        profileType: 'dostawca',
      };

      beforeEach(async () => {
        user = await appController.register(fakeRequestWithCreateBody());
      });

      test('then it should call authService', () => {
        expect(authService.register).toBeCalledWith(createBody);
      });

      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe('sendCode', () => {
    describe('when sendCode is called', () => {
      let result: boolean;
      const resetBody = {
        email: 'example@mail.com',
      };

      beforeEach(async () => {
        result = await appController.sendCode(resetBody);
      });

      test('then it should call authService', () => {
        expect(authService.sendCode).toBeCalledWith(resetBody.email);
      });

      test('then it should return true', () => {
        expect(result).toEqual(true);
      });
    });
  });
  describe('resetPassword', () => {
    describe('when resetPassword is called', () => {
      let user: User;
      const resetBody = {
        code: '123',
        newPassword: '123456',
        email: 'example@mail.com',
      };

      beforeEach(async () => {
        user = await appController.resetPassword(resetBody);
      });

      test('then it should call authService', () => {
        expect(authService.updatePassword).toBeCalledWith(resetBody);
      });

      test('then it should return true', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
