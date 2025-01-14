import { createRecebidosApp, getRecebidosAppByCodcli } from './recebidosAppMethods';
import { RecebidosAppMethods } from '../../apiMethods';

export class RecebidosAppMethodsImplementation extends RecebidosAppMethods {
  createRecebidosApp = createRecebidosApp;
  getRecebidosAppByCodcli = getRecebidosAppByCodcli;
}

export const Implemented_RecebidosApp_Methods = new RecebidosAppMethodsImplementation();