import axios from 'axios';

export async function useAxios(url: string, token: string, body: any, method: string) {
    const baseUrl = process.env.BASE_URL || '';
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
        return data;
    } catch (error) {
        console.error("Error making Axios request:", error);
        throw error;
    }
} 