import { ClientesApp } from '../interfaces';

export const mockedClient: ClientesApp = {
    id: 1,
    codcli: 123,
    razao: 'Mocked Razao',
    fantasia: 'Mocked Fantasia',
    pessoa: 'Mocked Pessoa',
    cnpj_cpf: '123.456.789-00',
    ie_rg: '123456789',
    endereco: 'Mocked Endereco',
    bairro: 'Mocked Bairro',
    cidade: 'Mocked Cidade',
    estado: 'Mocked Estado',
    cep: '12345-678',
    pais: 'Mocked Pais',
    contato: 'Mocked Contato',
    abertura: new Date(),
    clidesde: new Date(),
    transporta: 'Mocked Transporta',
    icms: 0,
    inativo: 'N',
    excluido: 'N',
    registro: 1,
    itens: [],
    memo: undefined,
    notas: [],
    recebidosApp: [],
    receberApp: []
};

export const mockedClients: ClientesApp[] = [mockedClient];