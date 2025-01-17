import { ClientesApp } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';
import { environment } from '../../config';
import { mockedClient } from '../../mocks/client';

export async function createClient(client: ClientesApp, token: string) {
    if (environment.appState === "OFFLINE") {
        // Return mocked data
        return Promise.resolve({ ...client, id: 1 }); // Example mocked data
    }
    return useAxios('/client', token, client, 'post');
}

export async function updateClient(id: string, client: Partial<ClientesApp>, token: string) {
    if (environment.appState === "OFFLINE") {
        // Return mocked data
        return Promise.resolve({ id, ...client }); // Example mocked data
    }
    return useAxios(`/client/${id}`, token, client, 'put');
}

export async function getClientWithFilter(page: number, limit: number, token: string) {
    if (environment.appState === "OFFLINE") {
        // Return mocked data
        return Promise.resolve([mockedClient]); // Example mocked data
    }
    return useAxios(`/client/filtered?page=${page}&limit=${limit}`, token, null, 'get');
} 