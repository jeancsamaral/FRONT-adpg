import { UsuariosApp } from "../interfaces";
import { mockedUserAuth } from "./usuarioAuth";

export const mockedUser: UsuariosApp = {
  id: 1,
  codusr: 123,
  nome: "Mocked User",
  supervisor: "Mocked Supervisor",
  inativo: "N",
  codven: "1",
  codger: "2",
  coddir: "3",
  excluido: "N",
  registro: 1,
  login: mockedUserAuth, // Reference to mockedUserAuth if needed
};

export const mockedUsers: UsuariosApp[] = [mockedUser];
