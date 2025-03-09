import { createClient, updateClient, getClientWithFilter } from './clientMethods';
import { ClientMethods } from '../../apiMethods';

export class ImplementedClientMethods extends ClientMethods {
    createClient = createClient;
    updateClient = updateClient;
    getClientWithFilter = getClientWithFilter;
}

export const Implemented_Client_Methods = new ImplementedClientMethods(); 