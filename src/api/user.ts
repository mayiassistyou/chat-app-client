import axiosClient from './axios-client';

const userApi = {
    getProfile: () => {
        return axiosClient.get('/user/me');
    },
    getFriend: (id: string) => {
        return axiosClient.get(`/user?id=${id}`, )
    }
}

export default userApi;