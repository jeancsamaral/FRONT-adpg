import { ClientesApp } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';
import { environment } from '../../config';
import { mockedClient, mockedClients } from '../../mocks/client';

export async function createClient(client: ClientesApp, token: string) {
    if (environment.appState === "OFFLINE") {
        // Return mocked data
        return Promise.resolve({ ...client, id: 1 }); // Example mocked data
    }
    return useAxios('/client', token, client, 'post');
}

export async function updateClient(id: string, client: Partial<ClientesApp>, token: string) {
    if (environment.appState === "OFFLINE") {
        // Return mocked data with proper typing
        return Promise.resolve(mockedClient);
    }
    return useAxios(`/client/${id}`, token, client, 'put');
}

export async function getClientWithFilter(page: number, limit: number, token: string) {
    if (environment.appState === "OFFLINE") {
        // Return paginated mock data
        const paginatedData = mockedClients.slice((page - 1) * limit, page * limit);
        return Promise.resolve(paginatedData);
    }
    return useAxios(`/client/filtered?page=${page}&limit=${limit}`, token, null, 'get');
} 