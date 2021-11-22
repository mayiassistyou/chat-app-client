import axiosClient from "./axios-client";

const authApi = {
    login: (email: string, password: string) => {
        return axiosClient.post('/auth/login', { email, password });
    }
}

export default authApi;