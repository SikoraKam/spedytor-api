import { UsersService } from '../users.service';
import { UserController } from '../user.controller';
import { Test } from '@nestjs/testing';
import { User } from '../user.schema';
import { fakeRequestWithUserId, userStub } from './stubs/user.stub';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UpdateUserRatingDto } from '../../types/users/updateUserRatingDto';
import { UpdateUserExpoPushToken } from '../../types/users/updateUserExpoPushToken';
import { NotificationPayload } from '../../types/notifications/notificationPayload';
import { Order } from '../../modules/orders/orders.schema';

jest.mock('../users.service');

describe('UserController', () => {
  let usersController: UserController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UsersService],
    }).compile();
    usersController = moduleRef.get<UserController>(UserController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.getUser(fakeRequestWithUserId());
      });

      test('then it should call usersService', () => {
        expect(usersService.findUser).toBeCalledWith(userStub()._id);
      });

      test('then should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getAllUsers', () => {
    describe('when getUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.getAllUsers();
      });

      test('then it should call usersService', () => {
        expect(usersService.findUsers).toHaveBeenCalled();
      });

      test('then should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('getProviders', () => {
    describe('when getProviders is called', () => {
      let providers: User[];

      beforeEach(async () => {
        providers = await usersController.getProviders();
      });

      test('then it should call usersService', () => {
        expect(usersService.findUsersByType).toHaveBeenCalled();
      });

      test('then should return users', () => {
        expect(providers).toEqual([userStub()]);
      });
    });
  });

  describe('getForwarders', () => {
    describe('when getProviders is called', () => {
      let forwarders: User[];

      beforeEach(async () => {
        forwarders = await usersController.getForwarders();
      });

      test('then it should call usersService', () => {
        expect(usersService.findUsersByType).toHaveBeenCalled();
      });

      test('then should return users', () => {
        expect(forwarders).toEqual([userStub()]);
      });
    });
  });

  describe('updateUserById', () => {
    describe('when updateUserById gets called', () => {
      let user: User;
      let updateUserDto: UpdateUserDto;

      beforeEach(async () => {
        updateUserDto = {
          name: 'NewName',
          lastName: 'NewLastName',
        };
        user = await usersController.updateUserById(
          fakeRequestWithUserId(),
          updateUserDto,
        );
      });

      test('then it should call usersService', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(
          userStub()._id,
          updateUserDto,
        );
      });

      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUserRating', () => {
    describe('when updateUserRatingByUserId gets called', () => {
      let user: User;
      let updateUserRatingDto: UpdateUserRatingDto;

      beforeEach(async () => {
        updateUserRatingDto = {
          mark: 5,
        };
        user = await usersController.updateUserRatingByUserId(
          userStub()._id,
          updateUserRatingDto,
        );
      });

      test('then it should call usersService', () => {
        expect(usersService.updateUserRating).toHaveBeenCalledWith(
          userStub()._id,
          updateUserRatingDto,
        );
      });

      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('updateUserExpoPushTokenByUserId', () => {
    describe('when updateUserExpoPushTokenByUserId gets called', () => {
      let user: User;
      let updateUserExpoPushToken: UpdateUserExpoPushToken;

      beforeEach(async () => {
        updateUserExpoPushToken = {
          expo_token: '12344',
        };
        user = await usersController.updateUserExpoPushTokenByUserId(
          fakeRequestWithUserId(),
          updateUserExpoPushToken,
        );
      });

      test('then it should call usersService', () => {
        expect(usersService.updateExpoPushToken).toHaveBeenCalledWith(
          userStub()._id,
          updateUserExpoPushToken.expo_token,
        );
      });

      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('removeExpoPushTokenByUserId', () => {
    describe('when removeExpoPushTokenByUserId gets called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.removeExpoPushTokenByUserId(
          fakeRequestWithUserId(),
        );
      });

      test('then it should call usersService', () => {
        expect(usersService.deleteExpoPushToken).toHaveBeenCalledWith(
          userStub()._id,
        );
      });

      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
