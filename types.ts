export interface Match {
    id: string;
    username: string;
    image: string;
    isOnline: boolean;
    lastMessage: string;
    lastMessageTime: Date;
}

export interface PersonalityChatAIResponse {
    response: string;
    choices: Array<String>;
}

export interface PersonalityChatUserResponse {
    response: string;
}
