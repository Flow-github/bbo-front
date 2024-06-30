import { User } from "./user";

export interface Message{
    idChatRoom: number;
    sender: User;
    text: string;
    timestamp: number;
}