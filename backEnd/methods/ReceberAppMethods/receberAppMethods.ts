import { ReceberApp } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';

export async function createReceberApp(receber: ReceberApp, token: string) {
    return useAxios('/receberApp', token, receber, 'post');
}

export async function getReceberAppByCodcli(codcli: string, page: number, limit: number, token: string) {
    return useAxios(`/receberApp/${codcli}?page=${page}&limit=${limit}`, token, null, 'get');
} 