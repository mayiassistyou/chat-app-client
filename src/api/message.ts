import axiosClient from "./axios-client";

const messageApi = {
    createConversation: (senderId: string, receiverId: string) => {
        return axiosClient.post('/conversation', { senderId, receiverId})
    },
    getConvesations: (id: string) => {
        return axiosClient.get(`/conversation/${id}`);
    },
    getMessages: (conversationId: string) => {
        return axiosClient.get(`/message/${conversationId}`);
    },
    sendMessage: (message: {conversationId: string, senderId: string, text: string}) => {
        return axiosClient.post('/message', message);
    }
}

export default messageApi;