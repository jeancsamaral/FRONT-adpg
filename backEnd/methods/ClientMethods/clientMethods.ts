import { ClientesApp } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';

export async function createClient(client: ClientesApp, token: string) {
    return useAxios('/client', token, client, 'post');
}

export async function updateClient(id: string, client: Partial<ClientesApp>, token: string) {
    return useAxios(`/client/${id}`, token, client, 'put');
}

export async function getClientWithFilter(page: number, limit: number, token: string) {
    return useAxios(`/client/filtered?page=${page}&limit=${limit}`, token, null, 'get');
} 