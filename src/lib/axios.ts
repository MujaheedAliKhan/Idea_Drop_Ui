//Syntax of using axios
//This is HTTP library
import axios from "axios";
import { getStoredAccessToken, setStoredAccessToken } from "./authToken";
import { refreshAccessToken } from "@/api/auth";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json'
    },
});

console.log(`API URL: ${import.meta.env.VITE_API_URL}`);
//Attach token on request
api.interceptors.request.use((config:any) => {
    config.headers = config.headers || {}; // ensure headers exists
    const token = getStoredAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (err:any) => Promise.reject(err));

//refresh token after expire
api.interceptors.response.use((res:any) => res, async (error:any) => {
    const originalRequest = error?.config;
    if (
        error?.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes('/auth/refresh')
    ) {
        originalRequest._retry = true;
        try {
            const { accessToken: newToken } = await refreshAccessToken();
            setStoredAccessToken(newToken);
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        } catch (err) {
            // refresh failed -> clear token and propagate error so app can logout / redirect
            setStoredAccessToken(null);
            return Promise.reject(err);
        }
    }

    return Promise.reject(error);
});

export default api;

// 🔄 Typical Flow Example

// 1️⃣ User’s access token expires
// 2️⃣ API call → returns 401 Unauthorized
// 3️⃣ Interceptor detects 401 → calls /auth/refresh
// 4️⃣ Backend verifies refresh token → sends new access token
// 5️⃣ Interceptor stores new token → retries the failed request
// 6️⃣ User never notices anything — everything continues smoothly