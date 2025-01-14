import { createClientItems, getClientItemsByCodcli } from './clientItemsMethods';
import { ClientItemsMethods } from '../../apiMethods';

export class ImplementedClientItemsMethods extends ClientItemsMethods {
  createClientItems = createClientItems;
  getClientItemsByCodcli = getClientItemsByCodcli;
}

export const Implemented_ClientItems_Methods = new ImplementedClientItemsMethods();