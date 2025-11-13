import axios from "axios";

// GANTI VALUE-NYA DENGAN LOKASI API ANDA
export const API_BASE_URL = 'http://localhost:8000/api';
export const API_TOKEN_LS_KEY = 'token';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// load token secara realtime setiap request
apiClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem(API_TOKEN_LS_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;