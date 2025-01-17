import { RecebidosApp } from "../interfaces";
import { mockedClient } from "./client";
import { mockedNota } from "./notas";

export const mockedRecebido: RecebidosApp = {
  id: 1,
  cliente: mockedClient,
  codcli: 123,
  previsto: new Date(),
  realizado: new Date(),
  valor: 500.0,
  nota: mockedNota.id,
  titulo: "Mocked Titulo",
  excluido: "N",
  registro: 1,
};

export const mockedRecebidos: RecebidosApp[] = [mockedRecebido];
