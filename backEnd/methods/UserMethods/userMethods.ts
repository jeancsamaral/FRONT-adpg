import { UsuariosApp } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';

export async function createUser(user: UsuariosApp, token: string) {
    return useAxios('/user', token, user, 'post');
}

export async function updateUser(id: string, user: Partial<UsuariosApp>, token: string) {
    return useAxios(`/user/${id}`, token, user, 'put');
}

export async function getAllUsers(page: number, limit: number, token: string) {
    return useAxios(`/user/all?page=${page}&limit=${limit}`, token, null, 'get');
} 