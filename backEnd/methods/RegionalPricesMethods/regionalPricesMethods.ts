import { ProdutosApp_PrecosRegiao } from "../../interfaces";
import { useAxios } from "../../utils/useAxios";
import { environment } from "../../config";
import { mockedRegionalPrice, mockedRegionalPrices } from "../../mocks/";

export async function createRegionalPrice(
  price: ProdutosApp_PrecosRegiao,
  token: string
) {
  if (environment.appState === "OFFLINE") {
    return mockedRegionalPrice;
  }
  return useAxios("/regionalPrices", token, price, "post");
}

export async function getAllRegionalPrices(
  page: number | null,
  limit: number | null,
  token: string
) {
  if (environment.appState === "OFFLINE") {
    return Promise.resolve(mockedRegionalPrices);
  }
  return useAxios(
    `/regionalPrices/all?page=${page}&limit=${limit}`,
    token,
    null,
    "get"
  );
}

export async function getFilteredRegionalPrices(
  filterObject: any,
  page: number,
  limit: number,
  token: string
) {
  if (environment.appState === "OFFLINE") {
    return Promise.resolve(mockedRegionalPrices);
  }
  return useAxios(
    `/regionalPrices/filtered?filter=${JSON.stringify(
      filterObject
    )}&page=${page}&limit=${limit}`,
    token,
    null,
    "get"
  );
}
