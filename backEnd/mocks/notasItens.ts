import { NotasApp_Itens } from "../interfaces";
import { mockedNota } from "./notas";

export const mockedNotaItem: NotasApp_Itens = {
  id: 1,
  nota: mockedNota, // Reference to mockedNota if needed
  codvenda: 456,
  codprod: 789,
  codproduto: "Mocked CodProduto",
  descricao: "Mocked Descricao",
  quantidade: 10,
  valor: "100.0",
  total: "1000.0",
};

export const mockedNotaItems: NotasApp_Itens[] = [mockedNotaItem];
