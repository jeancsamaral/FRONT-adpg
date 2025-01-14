import { ProdutosApp } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';

export async function getProducts(filterObject: any, page: number, limit: number, token: string) {
    return useAxios(`/product?filter=${JSON.stringify(filterObject)}&page=${page}&limit=${limit}`, token, null, 'get');
}

export async function createProducts(product: ProdutosApp, token: string) {
    return useAxios('/product', token, product, 'post');
} 