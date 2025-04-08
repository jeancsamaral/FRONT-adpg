import { Implemented_Client_Methods } from './methods/ClientMethods';
import { Implemented_Memo_Methods } from './methods/MemoMethods';
import { Implemented_ClientItems_Methods } from './methods/ClientItemsMethods';
import { Implemented_Group_Methods } from './methods/GroupMethods';
import { Implemented_Product_Methods } from './methods/ProductMethods';
import { Implemented_RegionalPrices_Methods } from './methods/RegionalPricesMethods';
import { Implemented_ReceberApp_Methods } from './methods/ReceberAppMethods';
import { Implemented_RecebidosApp_Methods } from './methods/RecebidosAppMethods';
import { Implemented_User_Methods } from './methods/UserMethods';
import { Implemented_Auth_Methods } from './methods/AuthMethods';
import { Implemented_Notas_Methods } from './methods/NotasMethods/index';
import { getAllFiles } from './methods/ArquivosMethods';

class ApiCaller {
    clientMethods = Implemented_Client_Methods;
    memoMethods = Implemented_Memo_Methods;
    clientItemsMethods = Implemented_ClientItems_Methods;
    groupMethods = Implemented_Group_Methods;
    productMethods = Implemented_Product_Methods;
    regionalPricesMethods = Implemented_RegionalPrices_Methods;
    receberAppMethods = Implemented_ReceberApp_Methods;
    recebidosAppMethods = Implemented_RecebidosApp_Methods;
    userMethods = Implemented_User_Methods;
    authMethods = Implemented_Auth_Methods;
    notasMethods = Implemented_Notas_Methods;
    arquivosMethods = { getAllFiles };
}

export default ApiCaller; 
