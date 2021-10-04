import { ProfileType } from '../../types/profileType';

export class CreateUserDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
  profileType: ProfileType;
}
