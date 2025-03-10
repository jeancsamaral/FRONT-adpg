import { UsuarioAuth } from "../interfaces";
import { mockedUser } from "./usuarios";

export const mockedUserAuth: UsuarioAuth = {
    id: 1,
    usuario: mockedUser, // Reference to mockedUser if needed
    codusr: 123,
    nome: 'Mocked User',
    login: 'mockedUser',
    password: 'mockedPassword',
    isAdmin: true,
    profileAccess: ['admin', 'user']
};

export const mockedUserAuths: UsuarioAuth[] = [mockedUserAuth]; 