import axiosClient from './axios-client';

const userApi = {
    getProfile: () => {
        return axiosClient.get('/user/me');
    },
    getFriend: (id: string) => {
        return axiosClient.get(`/user?id=${id}`, )
    },
    searchUser: (name: string) => {
        return axiosClient.get('/user/search', {params: {name}})
    }
}

export default userApi;