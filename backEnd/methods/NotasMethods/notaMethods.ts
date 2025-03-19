import { NotasApp, NotasApp_Itens } from "../../interfaces";
import { useAxios } from "../../utils/useAxios";
import { environment } from "../../config";
import { mockedNotas, mockedNota } from "../../mocks/notas";
import { mockedNotaItem } from "@/backEnd/mocks/notasItens";

export async function createNota(nota: NotasApp, token: string) {
  if (environment.appState === "OFFLINE") {
    return mockedNota;
  }
  return useAxios("/notas", token, nota, "post");
}

export async function getAllNotas(page: number, limit: number, token: string) {
  if (environment.appState === "OFFLINE") {
    return Promise.resolve({ data: mockedNotas, total: mockedNotas.length });
  }
  return useAxios(`/notas?page=${page}&limit=${limit}`, token, null, "get");
}

export async function getNotaById(id: string, token: string) {
  if (environment.appState === "OFFLINE") {
    return mockedNota;
  }
  return useAxios(`/notas/${id}`, token, null, "get");
}

export async function getNotaByClientId(codcli: string, token: string) {
  if (environment.appState === "OFFLINE") {
    return mockedNota;
  }
  const response = await useAxios(`/notas/0?codcli=${codcli}`, token, null, "get");
  return response;
}


export async function updateNota(
  id: string,
  nota: Partial<NotasApp>,
  token: string
) {
  if (environment.appState === "OFFLINE") {
    return mockedNota;
  }
  return useAxios(`/notas/${id}`, token, nota, "put");
}

export async function createNotaItem(item: NotasApp_Itens, token: string) {
  if (environment.appState === "OFFLINE") {
    return mockedNotaItem;
  }
  return useAxios("/notas/items", token, item, "post");
}

export async function getNotaItems(
  notaId: string,
  page: number,
  limit: number,
  token: string
) {
  if (environment.appState === "OFFLINE") {
    return Promise.resolve({
      data: [mockedNotaItem],
      total: [mockedNotaItem].length,
    });
  }
  return useAxios(
    `/notas/${notaId}/items?page=${page}&limit=${limit}`,
    token,
    null,
    "get"
  );
}
