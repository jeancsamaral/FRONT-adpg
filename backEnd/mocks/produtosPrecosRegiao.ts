import { ProdutosApp_PrecosRegiao } from '../interfaces';

export const mockedRegionalPrice: ProdutosApp_PrecosRegiao = {
    id: 1,
    codprod: 789,
    codproduto: 'Mocked CodProduto',
    descricao: 'Mocked Descricao',
    cod_st: 1,
    ipi: 10,
    moeda: 'BRL',
    precompra: 150.0,
    mc1_18: 180.0,
    mc2_18: 190.0,
    mc3_18: 200.0,
    mc1_12: 170.0,
    mc2_12: 180.0,
    mc3_12: 190.0,
    mc1_7: 160.0,
    mc2_7: 170.0,
    mc3_7: 180.0,
    mc1_4: 150.0,
    mc2_4: 160.0,
    mc3_4: 170.0,
    excluido: 'N'
};

export const mockedRegionalPrices: ProdutosApp_PrecosRegiao[] = [mockedRegionalPrice]; 