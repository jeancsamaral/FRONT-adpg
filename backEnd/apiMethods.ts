import { ClientesApp, ClientesApp_Memo, ClientesApp_Itens, GruposApp, ProdutosApp, ProdutosApp_PrecosRegiao, ReceberApp, RecebidosApp, UsuariosApp, UsuarioAuth, NotasApp, NotasApp_Itens } from './interfaces';

class GroupedMethods {
    constructor() {
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        methods.forEach((method) => {
            if (method !== "constructor" && typeof (this as any)[method] === "function") {
                (this as any)[method] = (this as any)[method].bind(this);
            }
        });
    }
}

export class ClientMethods extends GroupedMethods {
    createClient(client: ClientesApp, token: string): Promise<void> {
        console.log('createClient method needs to be implemented.', client, token);
        return Promise.resolve();
    }

    updateClient(id: string, client: Partial<ClientesApp>, token: string): Promise<void> {
        console.log('updateClient method needs to be implemented for id:', id, 'with data:', client, 'and token:', token);
        return Promise.resolve();
    }

    getClientWithFilter(page: number, limit: number, token: string): Promise<ClientesApp[]> {
        console.log('getClientWithFilter method needs to be implemented with pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }
}

export class MemoMethods extends GroupedMethods {
    createMemo(memo: ClientesApp_Memo, token: string): Promise<void> {
        console.log('createMemo method needs to be implemented.', memo, token);
        return Promise.resolve();
    }

    getMemoByCodcli(codcli: string, page: number, limit: number, token: string): Promise<ClientesApp_Memo[]> {
        console.log('getMemoByCodcli method needs to be implemented for codcli:', codcli, 'with pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }
}

export class ClientItemsMethods extends GroupedMethods {
    createClientItems(item: ClientesApp_Itens, token: string): Promise<void> {
        console.log('createClientItems method needs to be implemented.', item, token);
        return Promise.resolve();
    }

    getClientItemsByCodcli(codcli: string, page: number, limit: number, token: string): Promise<ClientesApp_Itens[]> {
        console.log('getClientItemsByCodcli method needs to be implemented for codcli:', codcli, 'with pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }
}

export class GroupMethods extends GroupedMethods {
    createGroup(group: GruposApp, token: string): Promise<void> {
        console.log('createGroup method needs to be implemented.', group, token);
        return Promise.resolve();
    }
}

export class ProductMethods extends GroupedMethods {
    getProducts(filterObject: any, page: number, limit: number, token: string): Promise<ProdutosApp[]> {
        console.log('getProducts method needs to be implemented with filterObject:', filterObject, 'and pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }

    createProducts(product: ProdutosApp, token: string): Promise<void> {
        console.log('createProducts method needs to be implemented.', product, token);
        return Promise.resolve();
    }
}

export class RegionalPricesMethods extends GroupedMethods {
    createRegionalPrice(price: ProdutosApp_PrecosRegiao, token: string): Promise<void> {
        console.log('createRegionalPrice method needs to be implemented.', price, token);
        return Promise.resolve();
    }

    getAllRegionalPrices(page: number, limit: number, token: string): Promise<ProdutosApp_PrecosRegiao[]> {
        console.log('getAllRegionalPrices method needs to be implemented with pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }

    getFilteredRegionalPrices(filterObject: any, page: number, limit: number, token: string): Promise<ProdutosApp_PrecosRegiao[]> {
        console.log('getFilteredRegionalPrices method needs to be implemented with filterObject:', filterObject, 'and pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }
}

export class ReceberAppMethods extends GroupedMethods {
    createReceberApp(receber: ReceberApp, token: string): Promise<void> {
        console.log('createReceberApp method needs to be implemented.', receber, token);
        return Promise.resolve();
    }

    getReceberAppByCodcli(codcli: string, page: number, limit: number, token: string): Promise<ReceberApp[]> {
        console.log('getReceberAppByCodcli method needs to be implemented for codcli:', codcli, 'with pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }
}

export class RecebidosAppMethods extends GroupedMethods {
    createRecebidosApp(recebidos: RecebidosApp, token: string): Promise<void> {
        console.log('createRecebidosApp method needs to be implemented.', recebidos, token);
        return Promise.resolve();
    }

    getRecebidosAppByCodcli(codcli: string, page: number, limit: number, token: string): Promise<RecebidosApp[]> {
        console.log('getRecebidosAppByCodcli method needs to be implemented for codcli:', codcli, 'with pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }
}

export class UserMethods extends GroupedMethods {
    createUser(user: UsuariosApp, token: string): Promise<void> {
        console.log('createUser method needs to be implemented.', user, token);
        return Promise.resolve();
    }

    updateUser(id: string, user: Partial<UsuariosApp>, token: string): Promise<void> {
        console.log('updateUser method needs to be implemented for id:', id, 'with data:', user, 'and token:', token);
        return Promise.resolve();
    }

    getAllUsers(page: number, limit: number, token: string): Promise<UsuariosApp[]> {
        console.log('getAllUsers method needs to be implemented with pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }
}

export class AuthMethods extends GroupedMethods {
    loginUser(credentials: { login: string; password: string }, token: string): Promise<boolean> {
        console.log('loginUser method needs to be implemented with credentials:', credentials, 'and token:', token);
        return Promise.resolve(false);
    }

    registerUser(user: UsuarioAuth, token: string): Promise<void> {
        console.log('registerUser method needs to be implemented.', user, token);
        return Promise.resolve();
    }
}

export class NotasMethods extends GroupedMethods {
    createNota(nota: NotasApp, token: string): Promise<void> {
        console.log('createNota method needs to be implemented.', nota, token);
        return Promise.resolve();
    }

    getAllNotas(page: number, limit: number, token: string): Promise<NotasApp[]> {
        console.log('getAllNotas method needs to be implemented with pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }

    getNotaById(id: string, token: string): Promise<NotasApp> {
        console.log('getNotaById method needs to be implemented for id:', id, 'and token:', token);
        return Promise.resolve({} as NotasApp);
    }

    updateNota(id: string, nota: Partial<NotasApp>, token: string): Promise<void> {
        console.log('updateNota method needs to be implemented for id:', id, 'with data:', nota, 'and token:', token);
        return Promise.resolve();
    }

    createNotaItem(item: NotasApp_Itens, token: string): Promise<void> {
        console.log('createNotaItem method needs to be implemented.', item, token);
        return Promise.resolve();
    }

    getNotaItems(notaId: string, page: number, limit: number, token: string): Promise<NotasApp_Itens[]> {
        console.log('getNotaItems method needs to be implemented for notaId:', notaId, 'with pagination. Page:', page, 'Limit:', limit, 'Token:', token);
        return Promise.resolve([]);
    }
} 