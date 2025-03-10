import axios from 'axios';
import { environment } from '../config';

export async function useAxios(url: string, token: string, body: any, method: string) {
    const baseUrl = environment.baseUrl || '';
    console.log("baseUrl", baseUrl);
    console.log("url", `${baseUrl}${url}`);
    try {
        const { data } = await axios({
            method: method, // or "post", "put", etc., depending on the use case
            url: `${baseUrl}${url}`,
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: body,
        });
        console.log("data", data);
        return data;
    } catch (error) {
        console.error("Error making Axios request:", error);
        throw error;
    }
} 