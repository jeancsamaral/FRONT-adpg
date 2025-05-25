import { loginUser, registerUser, getAllAuthUsers, deleteUser, deleteUserByCoduser } from './authMethods';
import { AuthMethods } from '../../apiMethods';

export class ImplementedAuthMethods extends AuthMethods {
    loginUser = loginUser;
    registerUser = registerUser;
    deleteUser = deleteUser;
    getAllAuthUsers = getAllAuthUsers;
    deleteUserByCoduser = deleteUserByCoduser;
}

export const Implemented_Auth_Methods = new ImplementedAuthMethods();