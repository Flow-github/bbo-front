import { User } from "./user";

export interface ChatRoom{
    id: number;
    sender: User;
    title: string;
    timestamp: number;
}