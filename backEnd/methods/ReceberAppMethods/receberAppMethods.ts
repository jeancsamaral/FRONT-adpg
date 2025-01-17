import { ReceberApp } from "../../interfaces";
import { useAxios } from "../../utils/useAxios";
import { mockedReceber, mockedRecebers } from "../../mocks/";
import { environment } from "../../config";

export async function createReceberApp(receber: ReceberApp, token: string) {
  if (environment.appState === "OFFLINE") {
    return receber;
  }
  return useAxios("/receberApp", token, receber, "post");
}

export async function getReceberAppByCodcli(
  codcli: string,
  page: number,
  limit: number,
  token: string
) {
  if (environment.appState === "OFFLINE") {
    return mockedReceber;
  }
  return useAxios(
    `/receberApp/${codcli}?page=${page}&limit=${limit}`,
    token,
    null,
    "get"
  );
}
