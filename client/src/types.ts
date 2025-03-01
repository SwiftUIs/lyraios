export interface AppConfig {
    id: string;
    name: string;
    icon: string;
    color: string;
    description?: string;
    chatTitle?: string;
}

export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'app';
    timestamp: Date;
} 