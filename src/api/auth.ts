import axiosClient from "./axios-client";

const authApi = {
    login: (username: string, password: string) => {
        return axiosClient.post('/auth/login', { username, password });
    },
    register: (name: string, username: string, password: string) => {
        return axiosClient.post('/auth/register', { name, username, password });
    }
}

export default authApi;