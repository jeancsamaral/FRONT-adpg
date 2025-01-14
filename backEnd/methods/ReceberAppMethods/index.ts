import { createReceberApp, getReceberAppByCodcli } from './receberAppMethods';
import { ReceberAppMethods } from '../../apiMethods';

export class ImplementedReceberAppMethods extends ReceberAppMethods {
  createReceberApp = createReceberApp;
  getReceberAppByCodcli = getReceberAppByCodcli;
}

export const Implemented_ReceberApp_Methods = new ImplementedReceberAppMethods();