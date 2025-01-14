import { loginUser, registerUser } from './authMethods';
import { AuthMethods } from '../../apiMethods';

export class ImplementedAuthMethods extends AuthMethods {
    loginUser = loginUser;
    registerUser = registerUser;
}

export const Implemented_Auth_Methods = new ImplementedAuthMethods();