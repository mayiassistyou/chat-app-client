import axiosClient from './axios-client';

const userApi = {
    getProfile: () => {
        return axiosClient.get('/user/me');
    }
}

export default userApi;