import { ProdutosApp_Lotes } from "../interfaces";
import { mockedProduct } from "./produtos";

export const mockedProductLot: ProdutosApp_Lotes = {
  id: 1,
  produto: mockedProduct,
  codprod: 789,
  codlote: 1,
  lote: 1001,
  validade: new Date(),
  estoque: 50,
  reservado: 5,
  disponivel: 45,
  excluido: "N",
  registro: 1,
};

export const mockedProductLots: ProdutosApp_Lotes[] = [mockedProductLot];
