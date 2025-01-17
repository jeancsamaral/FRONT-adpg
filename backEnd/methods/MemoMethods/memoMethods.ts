import { ClientesApp_Memo } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';
import { mockedMemos } from '../../mocks/memo';
import { environment } from '../../config';

export async function createMemo(memo: ClientesApp_Memo, token: string) {
    if (environment.appState === 'OFFLINE') {
        return Promise.resolve({ data: mockedMemos[0] });
    }
    return useAxios('/memo', token, memo, 'post');
}

export async function getMemoByCodcli(codcli: string, page: number, limit: number, token: string) {
    if (environment.appState === 'OFFLINE') {
        return Promise.resolve({ 
            data: mockedMemos.slice((page - 1) * limit, page * limit),
            total: mockedMemos.length 
        });
    }
    return useAxios(`/memo/${codcli}?page=${page}&limit=${limit}`, token, null, 'get');
}