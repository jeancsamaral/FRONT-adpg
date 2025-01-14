import { NotasApp, NotasApp_Itens } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';

export async function createNota(nota: NotasApp, token: string) {
    return useAxios('/notas', token, nota, 'post');
}

export async function getAllNotas(page: number, limit: number, token: string) {
    return useAxios(`/notas?page=${page}&limit=${limit}`, token, null, 'get');
}

export async function getNotaById(id: string, token: string) {
    return useAxios(`/notas/${id}`, token, null, 'get');
}

export async function updateNota(id: string, nota: Partial<NotasApp>, token: string) {
    return useAxios(`/notas/${id}`, token, nota, 'put');
}

export async function createNotaItem(item: NotasApp_Itens, token: string) {
    return useAxios('/notas/items', token, item, 'post');
}

export async function getNotaItems(notaId: string, page: number, limit: number, token: string) {
    return useAxios(`/notas/${notaId}/items?page=${page}&limit=${limit}`, token, null, 'get');
} 