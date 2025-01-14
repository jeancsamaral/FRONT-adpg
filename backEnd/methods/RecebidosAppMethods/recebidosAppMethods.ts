import { RecebidosApp } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';

export async function createRecebidosApp(recebidos: RecebidosApp, token: string) {
    return useAxios('/recebidosApp', token, recebidos, 'post');
}

export async function getRecebidosAppByCodcli(codcli: string, page: number, limit: number, token: string) {
    return useAxios(`/recebidosApp/${codcli}?page=${page}&limit=${limit}`, token, null, 'get');
} 