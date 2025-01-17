import { ProdutosApp } from "../../interfaces";
import { useAxios } from "../../utils/useAxios";
import { mockedProducts } from "../../mocks/";
import { environment } from "../../config";

export async function getProducts(
  filterObject: any,
  page: number,
  limit: number,
  token: string
) {
  if (environment.appState === "OFFLINE") {
    return mockedProducts;
  }
  return useAxios(
    `/product?filter=${JSON.stringify(
      filterObject
    )}&page=${page}&limit=${limit}`,
    token,
    null,
    "get"
  );
}

export async function createProducts(product: ProdutosApp, token: string) {
  if (environment.appState === "OFFLINE") {
    return { success: true, data: product };
  }
  return useAxios("/product", token, product, "post");
}
