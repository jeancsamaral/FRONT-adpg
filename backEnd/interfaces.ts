export interface ClientesApp {
    id: number;
    codcli: number;
    razao?: string;
    fantasia?: string;
    pessoa: string;
    cnpj_cpf: string;
    ie_rg: string;
    codven?: number;
    vendedor?: string;
    codger?: number;
    gerente?: string;
    coddir?: number;
    diretor?: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    pais: string;
    contato: string;
    fone?: string;
    fax?: string;
    email?: string;
    nfemail?: string;
    abertura: Date;
    clidesde: Date;
    transporta: string;
    icms: number;
    endcobra?: string;
    baicobra?: string;
    cidcobra?: string;
    ufcobra?: string;
    cepcobra?: string;
    contatcob?: string;
    fonecobra?: string;
    faxcob?: string;
    condpagto?: string;
    endecom?: string;
    bairrocom?: string;
    cidadecom?: string;
    ufcom?: string;
    cepcom?: string;
    contatcom?: string;
    fonecom?: string;
    faxcom?: string;
    isuframa?: number;
    bascalcicm?: string;
    inativo: string;
    excluido: string;
    registro: number;
    itens: ClientesApp_Itens[];
    memo?: ClientesApp_Memo;
    notas: NotasApp[];
    recebidosApp: RecebidosApp[];
    receberApp: ReceberApp[];
}

export interface ClientesApp_Memo {
    id: number;
    cliente: ClientesApp;
    codcli: number;
    observacao: string;
    follow: string;
}

export interface ClientesApp_Itens {
    id: number;
    cliente: ClientesApp;
    codcli: number;
    codprod: number;
    codproduto: string;
    descricao: string;
    moeda: string;
    preco: number;
    excluido: string;
    registro: number;
    ProdutosApp?: ProdutosApp;
    produtosAppId?: number;
}

export interface ProdutosApp {
    id: number;
    ClientesApp_Itens: ClientesApp_Itens[];
    codprod: number;
    codproduto: string;
    descricao: string;
    unidadeDePeso: string;
    moeda: string;
    preco: number;
    estoque: number;
    reservado: number;
    comprado: number;
    disponivel: number;
    GruposApp: GruposApp;
    codgru: number;
    Lote: ProdutosApp_Lotes[];
}

export interface ProdutosApp_PrecosRegiao {
    id: number;
    codprod: number;
    codproduto: string;
    descricao: string;
    cod_st: number;
    ipi: number;
    moeda: string;
    precompra?: number;
    mc1_18?: number;
    mc2_18?: number;
    mc3_18?: number;
    mc1_12?: number;
    mc2_12?: number;
    mc3_12?: number;
    mc1_7?: number;
    mc2_7?: number;
    mc3_7?: number;
    mc1_4?: number;
    mc2_4?: number;
    mc3_4?: number;
    excluido: string;
}

export interface ProdutosApp_Lotes {
    id: number;
    produto: ProdutosApp;
    codprod: number;
    codlote: number;
    lote: number;
    validade: Date;
    estoque: number;
    reservado: number;
    disponivel: number;
    excluido: string;
    registro: number;
}

export interface GruposApp {
    id: number;
    codgru: number;
    grupo: string;
    excluido: string;
    registro: number;
    produtos: ProdutosApp[];
}

export interface NotasApp {
    id: number;
    cliente: ClientesApp;
    codcli: number;
    codvenda: number;
    nota?: number;
    emissao: Date;
    totalprod: number;
    totalnota: number;
    codven?: number;
    codger?: number;
    coddir?: number;
    excluido: string;
    registro: number;
    itens: NotasApp_Itens[];
}

export interface NotasApp_Itens {
    id: number;
    nota: NotasApp;
    codvenda: number;
    codprod: number;
    codproduto: string;
    descricao: string;
    quantidade: number;
    valor: string;
    total: string;
}

export interface ReceberApp {
    id: number;
    codfin: number;
    cliente: ClientesApp;
    codcli: number;
    previsto: Date;
    valor: number;
    nota: number;
    titulo: string;
    excluido: string;
    registro: number;
}

export interface RecebidosApp {
    id: number;
    cliente: ClientesApp;
    codcli: number;
    previsto: Date;
    realizado: Date;
    valor: number;
    nota: number;
    titulo: string;
    excluido: string;
    registro: number;
}

export interface UsuariosApp {
    id: number;
    codusr: number;
    nome: string;
    supervisor: string;
    inativo: string;
    codven?: string;
    codger?: string;
    coddir?: string;
    excluido: string;
    registro: number;
    login?: UsuarioAuth;
}

export interface UsuarioAuth {
    id: number;
    usuario: UsuariosApp;
    codusr: number;
    nome: string;
    login: string;
    password: string;
    isAdmin: boolean;
    profileAccess: string[];
} 

export interface Arquivos_FISPQ {
    id: number;
    type : "FISPQ";
    arquivo: string;
    linkftp: string;
    dtaltera: Date;
}

export interface Arquivos_TDS {
    id: number;
    type : "TDS";
    arquivo: string;
    linkftp: string;
    dtaltera: Date;
}

export interface Arquivos_Generico {
    id: number;
    type : "TDS" | "FISPQ";
    arquivo: string;
    linkftp: string;
    dtaltera: Date;
}

