import { ClientesApp_Itens } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';
import { environment } from '../../config';
import { mockedClientItems } from '../../mocks/clientItems';

export async function createClientItems(item: ClientesApp_Itens, token: string) {
    if (environment.appState === 'OFFLINE') {
        return item;
    }
    return useAxios('/clientItems', token, item, 'post');
}

export async function getClientItemsByCodcli(codcli: string, page: number, limit: number, token: string) {
    if (environment.appState === 'OFFLINE') {
        return mockedClientItems;
    }
    return useAxios(`/clientItems/${codcli}?page=${page}&limit=${limit}`, token, null, 'get');
}