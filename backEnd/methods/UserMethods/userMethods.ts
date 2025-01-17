import { UsuariosApp } from "../../interfaces";
import { useAxios } from "../../utils/useAxios";
import { mockedUsers } from "../../mocks/";
import { environment } from "../../config";

export async function createUser(user: UsuariosApp, token: string) {
  if (environment.appState === "OFFLINE") {
    return user;
  }
  return useAxios("/user", token, user, "post");
}

export async function updateUser(
  id: string,
  user: Partial<UsuariosApp>,
  token: string
) {
  if (environment.appState === "OFFLINE") {
    return { data: { ...mockedUsers[0], ...user } };
  }
  return useAxios(`/user/${id}`, token, user, "put");
}

export async function getAllUsers(page: number, limit: number, token: string) {
  if (environment.appState === "OFFLINE") {
    return {
      data: mockedUsers.slice((page - 1) * limit, page * limit),
      total: mockedUsers.length,
    };
  }
  return useAxios(`/user/all?page=${page}&limit=${limit}`, token, null, "get");
}
