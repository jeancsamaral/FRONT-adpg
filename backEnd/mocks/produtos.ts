import { ProdutosApp } from "../interfaces";
import { mockedGroup } from "./grupos";

export const mockedProduct: ProdutosApp = {
  id: 1,
  ClientesApp_Itens: [],
  codprod: 789,
  codproduto: "Mocked CodProduto",
  descricao: "Mocked Descricao",
  unidadeDePeso: "kg",
  moeda: "BRL",
  preco: 200.0,
  estoque: 100,
  reservado: 10,
  comprado: 5,
  disponivel: 85,
  GruposApp: mockedGroup, // Reference to mockedGroup if needed
  codgru: 1,
  Lote: [],
};

export const mockedProducts: ProdutosApp[] = [mockedProduct];
