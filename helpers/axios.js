import axios from 'axios';
export const instance = axios.create({
    baseURL: 'https://accounting-software-backend.vercel.app/api',
    timeout: 10000,
    headers: { 'Access-Control-Allow-Origin': '*' }
});