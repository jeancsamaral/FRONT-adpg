import { ReceberApp } from "../interfaces";
import { mockedClient } from "./client";
import { mockedNota } from "./notas";

export const mockedReceber: ReceberApp = {
  id: 1,
  codfin: 123,
  cliente: mockedClient,
  codcli: 123,
  previsto: new Date(),
  valor: 500.0,
  nota: mockedNota.id,
  titulo: "Mocked Titulo",
  excluido: "N",
  registro: 1,
};

export const mockedRecebers: ReceberApp[] = [mockedReceber];
