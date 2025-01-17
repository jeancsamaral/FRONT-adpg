import { ClientesApp_Itens } from '../interfaces';
import { mockedClient } from './client';

export const mockedClientItem: ClientesApp_Itens = {
    id: 1,
    cliente: mockedClient, // Reference to mockedClient if needed
    codcli: 123,
    codprod: 456,
    codproduto: 'Mocked CodProduto',
    descricao: 'Mocked Descricao',
    moeda: 'BRL',
    preco: 100.0,
    excluido: 'N',
    registro: 1
};

export const mockedClientItems: ClientesApp_Itens[] = [mockedClientItem]; 