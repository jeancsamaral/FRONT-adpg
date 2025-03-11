import { RecebidosApp } from "../../interfaces";
import { useAxios } from "../../utils/useAxios";
import { environment } from "../../config";
import { mockedRecebidos,mockedRecebido } from "../../mocks/";

export async function createRecebidosApp(recebidos: RecebidosApp, token: string) {
    if (environment.appState === 'OFFLINE') {
        return recebidos;
    }
    return useAxios('/recebidosApp', token, recebidos, 'post');
}

export async function getRecebidosAppByCodcli(codcli: string, page: number, limit: number, token: string) {
    if (environment.appState === 'OFFLINE') {
        return mockedRecebidos;
    }
    const response = await useAxios(`/recebidosApp/${codcli}?page=${page}&limit=${limit}`, token, null, 'get');
    console.log("response7", response);
    return response;
}