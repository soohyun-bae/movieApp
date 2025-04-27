import axios from "axios";
import Cookies from 'js-cookie';

console.log('base url', import.meta.env.VITE_BACKEND_API_BASE_URL);
const backendAPI = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

backendAPI.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');

    if(accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

backendAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const res = await backendAPI.post("/auth/refresh")

        if(res.status === 200) {
          const newAccessToken = res.data.accessToken;
          Cookies.set('accessToken', newAccessToken);
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return backendAPI(error.config);
      } catch (refreshError) {
        console.log('refreshToken expired')
        // logout code
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default backendAPI;