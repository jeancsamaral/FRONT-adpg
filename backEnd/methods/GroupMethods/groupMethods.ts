import { GruposApp } from '../../interfaces';
import { useAxios } from '../../utils/useAxios';

export async function createGroup(group: GruposApp, token: string) {
    return useAxios('/group', token, group, 'post');
} 