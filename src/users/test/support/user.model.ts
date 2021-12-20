import { User } from '../../user.schema';
import { userStub } from '../stubs/user.stub';
import { MockModel } from '../../../database/support/mock.model';
import { Position } from '../../../modules/position/position.schema';

export class UserModel extends MockModel<User> {
  protected entityStub = userStub();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // findOne(): { populate: () => User } {
  //   return {
  //     populate: (): User => this.entityStub,
  //   };
  // }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // find(): { lean: { populate: () => User[] } } {
  //   return {
  //     lean: (): populate => {
  //       populate: (): User[] => [this.entityStub],
  //     },
  //   };
  // }
}
