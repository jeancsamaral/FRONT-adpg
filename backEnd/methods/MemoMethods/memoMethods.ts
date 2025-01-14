import { ClientesApp_Memo } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';

export async function createMemo(memo: ClientesApp_Memo, token: string) {
    return useAxios('/memo', token, memo, 'post');
}

export async function getMemoByCodcli(codcli: string, page: number, limit: number, token: string) {
    return useAxios(`/memo/${codcli}?page=${page}&limit=${limit}`, token, null, 'get');
} 