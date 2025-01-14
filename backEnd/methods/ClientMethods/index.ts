import { createClient, updateClient, getClientWithFilter } from './clientMethods';
import { ClientMethods } from '../../apiMethods';

class Implemented_Client_Methods extends ClientMethods {
    createClient = createClient;
    updateClient = updateClient;
    getClientWithFilter = getClientWithFilter;
}

export { Implemented_Client_Methods }; 