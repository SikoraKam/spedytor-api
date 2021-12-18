import { User } from '../../user.schema';
import { userStub } from '../stubs/user.stub';
import { MockModel } from '../../../database/support/mock.model';

export class UserModel extends MockModel<User> {
  protected entityStub = userStub();
}
