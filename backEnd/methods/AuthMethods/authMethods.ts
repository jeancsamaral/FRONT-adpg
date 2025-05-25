import { UsuarioAuth } from "../../interfaces";
import { useAxios } from "../../utils/useAxios";
import { mockedUserAuth, mockedUserAuths } from "../../mocks/";
import { environment } from "../../config";

export async function loginUser(
  credentials: { login: string; password: string },
  token: string
) {
  if (environment.appState === "OFFLINE") {
    return {mockedUserAuth, token: "mockedToken"};
  }
  console.log("credentials",credentials);
  return useAxios("/auth/login", token, credentials, "post");
}

export async function registerUser(user: Partial<UsuarioAuth>, token: string) {
  if (environment.appState === "OFFLINE") {
    return mockedUserAuth;
  }
  console.log("user.body!",user);
  return useAxios("/auth/register", token, user, "post");
}

export async function getAllAuthUsers(token: string) {
  if (environment.appState === "OFFLINE") {
    return { users: mockedUserAuths };
  }
  return useAxios("/auth/users", token, null, "get");
}

export async function deleteUser(id: number, token: string) {
  console.log('Auth API: deleteUser called with ID:', id);
  if (environment.appState === "OFFLINE") {
    console.log('Auth API: In offline mode, returning mock success');
    return { message: "User deleted" };
  }
  console.log(`Auth API: Calling API endpoint /auth/${id} with DELETE method`);
  return useAxios(`/auth/id/${id}`, token, null, "delete");
}

export async function deleteUserByCoduser(codusr: string, token: string) {
  console.log('Auth API: deleteUserByCoduser called with ID:', codusr);
  if (environment.appState === "OFFLINE") {
    console.log('Auth API: In offline mode, returning mock success');
    return { message: "User deleted" };
  }
  return useAxios(`/auth/codusr/${codusr}`, token, null, "delete");
}
