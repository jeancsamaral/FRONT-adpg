import { createUser, updateUser, getUser, getAllUsers, updateUserAuth } from './userMethods';
import { UserMethods } from '../../apiMethods';

export class ImplementedUserMethods extends UserMethods {
  createUser = createUser;
  updateUser = updateUser;
  updateUserAuth = updateUserAuth;
  getUser = getUser;
  getAllUsers = getAllUsers;
}

export const Implemented_User_Methods = new ImplementedUserMethods();