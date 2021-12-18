import { UsersService } from '../users.service';
import { UserRepository } from '../user.repository';
import { Test } from '@nestjs/testing';
import { User } from '../user.schema';
import {
  userStub,
  userStubWithOutdatedCode,
  userStubWithTypeProvider,
} from './stubs/user.stub';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UpdateUserRatingDto } from '../../types/users/updateUserRatingDto';
import { NotificationPayload } from '../../types/notifications/notificationPayload';
import { Order } from '../../modules/orders/orders.schema';
import { HttpException } from '@nestjs/common';

jest.mock('../user.repository');

describe('UserService', () => {
  let usersService: UsersService;
  let usersService2: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserRepository, UsersService],
    }).compile();
    usersService = moduleRef.get<UsersService>(UsersService);
    usersService2 = moduleRef.get<UsersService>(UsersService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    jest.clearAllMocks();
  });

  describe('findUserByEmail', () => {
    describe('when findUserByEmail is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersService.findUserByEmail(userStub().email);
      });

      test('then it should call userRepo', () => {
        expect(userRepository.findOne).toBeCalledWith({
          email: userStub().email,
        });
      });

      test('then should return user', () => {
        expect(user).toEqual(userStubWithTypeProvider());
      });
    });
  });

  describe('findUser', () => {
    describe('when findUser is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersService.findUser(userStubWithTypeProvider()._id);
      });

      test('then it should call userRepo', () => {
        expect(userRepository.findOne).toBeCalledWith({
          _id: userStubWithTypeProvider()._id,
        });
      });

      test('then should return user', () => {
        expect(user).toEqual(userStubWithTypeProvider());
      });
    });
  });

  describe('findUsers', () => {
    describe('when findUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersService.findUsers();
      });

      test('then it should call userRepo', () => {
        expect(userRepository.findAll).toBeCalledWith({});
      });

      test('then should return user', () => {
        expect(users).toEqual([userStubWithTypeProvider()]);
      });
    });
  });

  describe('findUsersByType', () => {
    describe('when findUsers is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersService.findUsersByType(
          userStubWithTypeProvider().profileType,
        );
      });

      test('then it should call userRepo', () => {
        expect(userRepository.findAll).toBeCalledWith({
          profileType: userStubWithTypeProvider().profileType,
        });
      });

      test('then should return user', () => {
        expect(users).toEqual([userStubWithTypeProvider()]);
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let userDto: CreateUserDto;

      beforeEach(async () => {
        userDto = {
          name: userStubWithTypeProvider().name,
          lastName: userStubWithTypeProvider().lastName,
          email: userStubWithTypeProvider().email,
          password: userStubWithTypeProvider().password,
          profileType: userStubWithTypeProvider().profileType,
        };
        user = await usersService.createUser(userDto);
      });

      test('then it should call register method and return user', () => {
        expect(user).toEqual(userStubWithTypeProvider());
      });
    });
  });

  describe('register', () => {
    describe('when register is called', () => {
      let user: User;
      let data: CreateUserDto;

      beforeEach(async () => {
        data = {
          name: userStubWithTypeProvider().name,
          lastName: userStubWithTypeProvider().lastName,
          email: userStubWithTypeProvider().email,
          password: userStubWithTypeProvider().password,
          profileType: userStubWithTypeProvider().profileType,
        };
        user = await usersService.register(data);
      });

      test('then it should call userRepo', () => {
        expect(userRepository.create).toBeCalled();
      });
      test('then should return user', () => {
        // password is not hashed because of mock user repo which return userStub
        expect(user).toEqual(userStubWithTypeProvider());
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: User;
      let userDto: UpdateUserDto;

      beforeEach(async () => {
        userDto = {
          name: userStubWithTypeProvider().name,
          lastName: userStubWithTypeProvider().lastName,
        };
        user = await usersService.updateUser(
          userStubWithTypeProvider()._id,
          userDto,
        );
      });

      test('then it should call userRepo', () => {
        expect(userRepository.findOneAndUpdate).toBeCalledWith(
          { _id: userStubWithTypeProvider()._id },
          userDto,
        );
      });
      test('then should return user', () => {
        // password is not hashed because of mock user repo which return userStub
        expect(user).toEqual(userStubWithTypeProvider());
      });
    });
  });

  describe('updateUserRating', () => {
    describe('when updateUserRating is called', () => {
      let user: User;
      let userDto: UpdateUserRatingDto;

      beforeEach(async () => {
        userDto = {
          mark: 2,
        };
        user = await usersService.updateUserRating(
          userStubWithTypeProvider()._id,
          userDto,
        );
      });

      test('then it should call userRepo to find user with provided id', () => {
        expect(userRepository.findOne).toBeCalledWith({
          _id: userStubWithTypeProvider()._id,
        });
      });

      test('then should calculate avarage', () => {
        const marks = [...user.marks];
        marks.push(3);
        const arrAvg = marks.reduce((a, b) => a + b, 0) / marks.length;
        expect(arrAvg).toBe(4);
      });

      test('then should return user', () => {
        // password is not hashed because of mock user repo which return userStub
        expect(user).toEqual(userStubWithTypeProvider());
      });
    });
  });

  describe('updateUserResetCode', () => {
    describe('when updateUserResetCode is called', () => {
      let user: User;
      let resetData: {
        code: string;
        expire_timestamp: number;
        created_timestamp: number;
      };

      beforeEach(async () => {
        resetData = {
          code: '2',
          expire_timestamp: 0,
          created_timestamp: 0,
        };
        user = await usersService.updateUserResetCode(
          userStubWithTypeProvider()._id,
          resetData,
        );
      });

      test('then it should call userRepo', () => {
        expect(userRepository.findOneAndUpdate).toBeCalledWith(
          { _id: userStubWithTypeProvider()._id },
          resetData,
        );
      });
      test('then should return user', () => {
        // password is not hashed because of mock user repo which return userStub
        expect(user).toEqual(userStubWithTypeProvider());
      });
    });
  });

  describe('updateExpoPushToken', () => {
    describe('when updateExpoPushToken is called', () => {
      let user: User;
      const token = '123';

      beforeEach(async () => {
        user = await usersService.updateExpoPushToken(
          userStubWithTypeProvider()._id.toHexString(),
          token,
        );
      });

      test('then it should call userRepo', () => {
        expect(userRepository.findOneAndUpdate).toBeCalledWith(
          { _id: userStubWithTypeProvider()._id },
          { expo_token: token },
        );
      });
      test('then should return user', () => {
        // password is not hashed because of mock user repo which return userStub
        expect(user).toEqual(userStubWithTypeProvider());
      });
    });
  });

  describe('deleteExpoPushToken', () => {
    describe('when deleteExpoPushToken is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersService.deleteExpoPushToken(
          userStubWithTypeProvider()._id.toHexString(),
        );
      });

      test('then it should call userRepo', () => {
        expect(userRepository.findOneAndUpdate).toBeCalledWith(
          {
            _id: userStubWithTypeProvider()._id,
          },
          { expo_token: '' },
        );
      });
      test('then should return user', () => {
        // password is not hashed because of mock user repo which return userStub
        expect(user).toEqual(userStubWithTypeProvider());
      });
    });
  });

  describe('sendPushNotification', () => {
    describe('when sendPushNotification is called', () => {
      let notificationPayload: NotificationPayload;

      beforeEach(async () => {
        notificationPayload = {
          orderObject: new Order(),
          sentDate: '',
          announcement: 'a',
          title: 't',
        };

        await usersService.sendPushNotification(
          userStubWithTypeProvider()._id,
          notificationPayload,
        );
      });

      test('then userRepo should be called', () => {
        expect(userRepository.findOne).toBeCalledWith({
          _id: userStubWithTypeProvider()._id,
        });
      });
    });
  });

  describe('updatePassword', () => {
    describe('when updatePassword is called', () => {
      let user: User;

      test('then it should call userRepo', async () => {
        user = await usersService.updatePassword(
          '12345',
          'password',
          userStubWithTypeProvider().email,
        );
        expect(userRepository.findOneAndUpdate).toBeCalledWith(
          { _id: userStubWithTypeProvider()._id },
          { code: '', expire_timestamp: 0, created_timestamp: 0 },
        );
      });
      test('then should return user', async () => {
        user = await usersService.updatePassword(
          '12345',
          'password',
          userStubWithTypeProvider().email,
        );
        expect(user).toEqual(userStubWithTypeProvider());
      });

      test('then should call userRepo and throw exception', async () => {
        try {
          user = await usersService.updatePassword(
            '12345',
            'password',
            userStubWithOutdatedCode().email,
          );
          expect(userRepository.findOneAndUpdate).toBeCalledWith(
            { _id: userStubWithTypeProvider()._id },
            { code: '', expire_timestamp: 0, created_timestamp: 0 },
          );
        } catch (e) {
          expect(e).toBeInstanceOf(HttpException);
        }
      });

      test('then should throw Http exception because of wrong code', async () => {
        try {
          await usersService.updatePassword(
            '123',
            'password',
            userStubWithTypeProvider().email,
          );
        } catch (e) {
          expect(e).toBeInstanceOf(HttpException);
        }
      });
    });
  });
});
