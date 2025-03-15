import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

// interceptor for JWT token
api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}
,(error) => {
    Promise.reject(error);
        console.log("interceptor error ",error);
    })

// add response interceptor to handle token expiration

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token'); // Match backend naming
            try {
                const { data } = await axios.post('http://localhost:8080/api/auth/refresh-token', { refresh_token: refreshToken });
                localStorage.setItem('access_token', data.data.access_token);
                localStorage.setItem('refresh_token', data.data.refresh_token);
                originalRequest.headers.Authorization = `Bearer ${data.data.access_token}`;
                return api(originalRequest);
            } catch (err) {
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;