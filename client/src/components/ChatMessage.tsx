import { Message } from '../types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { formatTime } from '@/lib/utils';

interface ChatMessageProps {
    message: Message;
    appColor: string;
}

export function ChatMessage({ message, appColor }: ChatMessageProps) {
    const isApp = message.sender === 'app';

    return (
        <motion.div
            className={cn(
                "chat-message",
                isApp ? "chat-message-app" : "chat-message-user"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {isApp && (
                <div
                    className="chat-message-avatar"
                    style={{ backgroundColor: appColor }}
                >
                    <span className="material-symbols-rounded">smart_toy</span>
                </div>
            )}

            <div className="chat-message-content">
                <div
                    className={cn(
                        "chat-message-bubble",
                        isApp ? "chat-message-bubble-app" : "chat-message-bubble-user"
                    )}
                    style={isApp ? {} : { backgroundColor: appColor }}
                >
                    {message.content}
                </div>
                <div className="chat-message-time">
                    {formatTime(message.timestamp, { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </motion.div>
    );
} 