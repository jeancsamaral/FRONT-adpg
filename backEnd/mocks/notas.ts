import { NotasApp } from "../interfaces";
import { mockedClient } from "./client";

export const mockedNota: NotasApp = {
  id: 1,
  cliente: mockedClient, // Reference to mockedClient if needed
  codcli: 123,
  codvenda: 456,
  nota: 789,
  emissao: new Date(),
  totalprod: 1000.0,
  totalnota: 1100.0,
  codven: 1,
  codger: 2,
  coddir: 3,
  excluido: "N",
  registro: 1,
  itens: [],
};

export const mockedNotas: NotasApp[] = [mockedNota];
