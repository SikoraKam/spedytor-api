import { UserModel } from './support/user.model';
import { UserRepository } from '../user.repository';
import { User, UserDocument } from '../user.schema';
import { FilterQuery } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { userStub } from './stubs/user.stub';
import { Test } from '@nestjs/testing';

describe('UsersRepository', () => {
  let usersRepository: UserRepository;

  describe('find operations', () => {
    let userModel: UserModel;
    let userFilterQuery: FilterQuery<UserDocument>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UserRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel,
          },
        ],
      }).compile();

      usersRepository = moduleRef.get<UserRepository>(UserRepository);
      userModel = moduleRef.get<UserModel>(getModelToken(User.name));

      userFilterQuery = {
        _id: userStub()._id,
      };

      jest.clearAllMocks();
    });

    // describe('findOne', () => {
    //   describe('when findOne is called', () => {
    //     userModel.findOne.mockImplementationOnce(() => ({
    //       lean: jest.fn().mockReturnValue(personModel),
    //     }));
    //
    //     let user: User;
    //
    //     beforeEach(async () => {
    //       jest.spyOn(userModel, 'findOne');
    //       user = await usersRepository.findOne(userFilterQuery);
    //     });
    //
    //     test('then it should call the userModel', () => {
    //       expect(userModel.findOne).toHaveBeenCalledWith(userFilterQuery);
    //     });
    //
    //     test('then it should return a user', () => {
    //       expect(user).toEqual(userStub());
    //     });
    //   });
    // });

    // describe('findAll', () => {
    //   describe('when findAll is called', () => {
    //     let users: User[];
    //
    //     beforeEach(async () => {
    //       jest.spyOn(userModel, 'find');
    //       users = await usersRepository.findAll(userFilterQuery);
    //     });
    //
    //     test('then it should call the userModel', () => {
    //       expect(userModel.find).toHaveBeenCalledWith(userFilterQuery);
    //     });
    //
    //     test('then it should return a user', () => {
    //       expect(users).toEqual([userStub()]);
    //     });
    //   });
    // });

    describe('findOneAndUpdate', () => {
      describe('when findOneAndUpdate is called', () => {
        let user: User;

        beforeEach(async () => {
          jest.spyOn(userModel, 'findOneAndUpdate');
          user = await usersRepository.findOneAndUpdate(
            userFilterQuery,
            userStub(),
          );
        });

        test('then it should call the userModel', () => {
          expect(
            userModel.findOneAndUpdate,
          ).toHaveBeenCalledWith(userFilterQuery, userStub(), { new: true });
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });

    // describe('create', () => {
    //   describe('when create is called', () => {
    //     let user: User;
    //
    //     beforeEach(async () => {
    //       jest.spyOn(userModel, 'save');
    //       user = await usersRepository.create(userStub());
    //     });
    //
    //     test('then it should return a user', () => {
    //       expect(user).toEqual(userStub());
    //     });
    //   });
    // });
  });
});
