import { UsuarioAuth } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';

export async function loginUser(credentials: { login: string; password: string }, token: string) {
    return useAxios('/auth/login', token, credentials, 'post');
}

export async function registerUser(user: UsuarioAuth, token: string) {
    return useAxios('/auth/register', token, user, 'post');
} 