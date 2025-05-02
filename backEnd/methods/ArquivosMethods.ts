import { useAxios } from '../utils/useAxios';
import { Arquivos_Generico } from '../interfaces';

/**
 * Fetches all generic files with pagination
 * @param page - The page number to fetch
 * @param limit - The number of items per page
 * @returns Promise with the generic files data
 */
export const getAllFiles = async (page: number = 1, limit: number = 10, search: string = "", token: string): Promise<{
  data: Arquivos_Generico[];
  total: number;
  page: number;
  limit: number;
  totalpages: number;
}> => {
  try {
    const response = await useAxios(`/files/get-all?page=${page}&limit=${limit}&search=${search}`, token, null, "get");
    const {total, page: responsePage, limit: responseLimit, totalpages} = response.pagination;
    return {
      data: response.data, 
      total: total, 
      page: responsePage, 
      limit: responseLimit, 
      totalpages: totalpages
    };
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};
