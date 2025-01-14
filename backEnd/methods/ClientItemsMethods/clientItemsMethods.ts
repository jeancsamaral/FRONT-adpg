import { ClientesApp_Itens } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';

export async function createClientItems(item: ClientesApp_Itens, token: string) {
    return useAxios('/clientItems', token, item, 'post');
}

export async function getClientItemsByCodcli(codcli: string, page: number, limit: number, token: string) {
    return useAxios(`/clientItems/${codcli}?page=${page}&limit=${limit}`, token, null, 'get');
} 