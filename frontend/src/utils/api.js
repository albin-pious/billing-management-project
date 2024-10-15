import axios from 'axios'
const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    withCredentials: true,
});

export const BASE_URL = "http://127.0.0.1:5000"

// Request interceptor to attach token to headers
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling 401 errors and refreshing token
api.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');

                // If there's no refresh token, redirect to login
                if (!refreshToken) {
                    window.location.href = '/login';
                    return;
                }

                const refreshResponse = await api.post('/auth/refresh-token', { refreshToken });

                const { token, refreshToken: newRefreshToken } = refreshResponse.data;

                // Update tokens in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Retry the original failed request with the new token
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token expired or invalid:', refreshError);
                window.location.href = '/login';  // Redirect to login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const getApi = async (endpoint, data) => {
    return await api.get(endpoint, data).then((result) => {
        return result.data;
    }).catch(e => {
        console.log("Error ", e);
        return false
    })
}

export const postApi = async (endpoint, data) => {
    return await api.post(endpoint, data).then((result) => {
        return result.data
    }).catch(e => {
        console.log("Error", e)
        return false
    });
}

export const putApi = async (endpoint, data) => {
    return await api.put(endpoint, data).then((result) => {
        return result.data
    }).catch(e => {
        console.log("Error", e)
        return false
    })
}

export const deleteApi = async (endpoint, data)=> {
    return await api.delete(endpoint, data).then((result) => {
        return result.data
    }).catch(e => {
        console.log("Error", e)
        return false
    })
}
