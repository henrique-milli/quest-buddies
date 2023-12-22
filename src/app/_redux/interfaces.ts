export interface ChatMessage {
    text: string;
    isUser: boolean
    isImage: boolean;
}

export interface ChatState {
    messages: ChatMessage[];
    currentUserId: string;
    botIsTyping: boolean;
    counter: number;
    sendRealMessages: boolean;
}

export type ChatAction = {
    type: string;
    payload: any;
}

