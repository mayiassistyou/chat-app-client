import axiosClient from "./axios-client";

const messageApi = {
    getConvesations: (id: string) => {
        return axiosClient.get(`/conversation/${id}`);
    },
    getMessages: (id: string) => {
        return axiosClient.get(`/message/${id}`);
    },
    sendMessage: (message: {conversationId: string, senderId: string, text: string}) => {
        return axiosClient.post('/message', message);
    }
}

export default messageApi;