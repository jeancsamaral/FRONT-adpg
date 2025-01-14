import { createUser, updateUser } from './userMethods';
import { UserMethods } from '../../apiMethods';

export class ImplementedUserMethods extends UserMethods {
  createUser = createUser;
  updateUser = updateUser;
}

export const Implemented_User_Methods = new ImplementedUserMethods();