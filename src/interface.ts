export interface IUser {
    _id: string;
    name: string;
    username: string;
    avatar?: string;
}

export interface IConversation {
    _id: string;
    members: string[];
    updateTime: number;
    lastMessage: string;
}

export interface IMessage {
    conversationId: string;
    senderId: string;
    text: string;
    createdAt: any;
}