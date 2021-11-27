export interface IUser {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface IConversation {
    _id: string;
    members: string[];
}

export interface IMessage {
    conversationId: string;
    senderId: string;
    text: string;
    createdAt: any;
}