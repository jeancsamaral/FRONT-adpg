import axios from 'axios';
import { environment } from '../config';

export async function useAxios(url: string, token: string, body: any, method: string) {
    const baseUrl = environment.baseUrl || '';
    try {
        const { data } = await axios({
            method: method,
            url: `${baseUrl}${url}`,
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: body,
        });
        return data;
    } catch (error) {
        throw error;
    }
} 