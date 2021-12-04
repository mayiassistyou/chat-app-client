import axios, { AxiosInstance } from 'axios';
import queryString from 'query-string';

const axiosClient: AxiosInstance = axios.create({
    // baseURL: 'https://chat-choichoi-app.herokuapp.com/api',
    baseURL: "http://localhost:3333/api",
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    (config as any).headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default axiosClient;