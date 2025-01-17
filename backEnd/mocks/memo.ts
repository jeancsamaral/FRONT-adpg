import { ClientesApp_Memo } from '../interfaces';
import { mockedClient } from './client';

export const mockedMemo: ClientesApp_Memo = {
    id: 1,
    cliente: mockedClient, // Reference to mockedClient if needed
    codcli: 123,
    observacao: 'Mocked Observacao',
    follow: 'Mocked Follow'
};

export const mockedMemos: ClientesApp_Memo[] = [mockedMemo]; 