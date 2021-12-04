import axiosClient from "./axios-client";

const messageApi = {
    getConvesations: (id: string) => {
        return axiosClient.get(`/conversation/${id}`);
    },
    getMessages: (conversationId: string) => {
        return axiosClient.get(`/message/${conversationId}`);
    },
    getLastMessage: (conversationId: string) => {
        return axiosClient.get(`/message/lastmsg/${conversationId}`)
    },
    sendMessage: (message: {conversationId: string, senderId: string, text: string}) => {
        return axiosClient.post('/message', message);
    }
}

export default messageApi;