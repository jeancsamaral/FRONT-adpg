import { UsuarioAuth } from "../../interfaces";
import { useAxios } from "../../utils/useAxios";
import { mockedUserAuth, mockedUserAuths } from "../../mocks/";
import { environment } from "../../config";

export async function loginUser(
  credentials: { login: string; password: string },
  token: string
) {
  if (environment.appState === "OFFLINE") {
    console.log("Mocked user auth",mockedUserAuth);
    return {mockedUserAuth, token: "mockedToken"};
  }
  return useAxios("/auth/login", token, credentials, "post");
}

export async function registerUser(user: UsuarioAuth, token: string) {
  if (environment.appState === "OFFLINE") {
    return mockedUserAuth;
  }
  return useAxios("/auth/register", token, user, "post");
}
