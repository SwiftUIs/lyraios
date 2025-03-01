import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppConfig, Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { getLLMResponse } from '@/services/llmService';

interface ChatDialogProps {
    isOpen: boolean;
    onClose: () => void;
    app: AppConfig | null;
}

export function ChatDialog({ isOpen, onClose, app }: ChatDialogProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Reset messages when app changes
    useEffect(() => {
        if (app) {
            setMessages([
                {
                    id: uuidv4(),
                    content: `Welcome to ${app.name}! How can I help you today?`,
                    sender: 'app',
                    timestamp: new Date()
                }
            ]);
        }
    }, [app]);

    // Auto scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input field when dialog opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 300);
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !app) return;

        // Add user message
        const userMessage: Message = {
            id: uuidv4(),
            content: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Show app is typing
        setIsTyping(true);

        try {
            // Convert messages to format expected by LLM API
            const messageHistory = messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.content
            }));

            // Add the new user message
            messageHistory.push({
                role: 'user',
                content: userMessage.content
            });

            // Get response from LLM API
            const response = await getLLMResponse(app, userMessage.content, messageHistory);

            // Create app message with response
            const appMessage: Message = {
                id: uuidv4(),
                content: response,
                sender: 'app',
                timestamp: new Date()
            };

            setMessages((prev) => [...prev, appMessage]);
        } catch (error) {
            console.error('Error getting response:', error);

            // Fallback response in case of error
            const errorMessage: Message = {
                id: uuidv4(),
                content: `I'm sorry, I'm having trouble processing your request right now. Please try again later.`,
                sender: 'app',
                timestamp: new Date()
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    if (!app) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="chat-dialog-content">
                <div className="chat-dialog-header">
                    <div className="chat-dialog-title">
                        <div
                            className="chat-dialog-app-icon"
                            style={{ backgroundColor: app.color }}
                        >
                            <span className="material-symbols-rounded">{app.icon}</span>
                        </div>
                        <div className="chat-dialog-title-text">
                            <div className="chat-dialog-app-name">{app.chatTitle || app.name}</div>
                            <div className="chat-dialog-app-status">Online</div>
                        </div>
                    </div>
                </div>

                <div
                    className="chat-messages-container"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://source.unsplash.com/random/800x600/?pattern')`
                    }}
                >
                    <div className="chat-date-divider">
                        <span>Today</span>
                    </div>

                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} appColor={app.color} />
                    ))}

                    <AnimatePresence>
                        {isTyping && (
                            <motion.div
                                className="chat-typing-indicator"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                <div
                                    className="chat-message-avatar"
                                    style={{ backgroundColor: app.color }}
                                >
                                    <span className="material-symbols-rounded">smart_toy</span>
                                </div>
                                <div className="chat-typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-container">
                    <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="chat-input"
                    />

                    <Button
                        onClick={handleSendMessage}
                        className="chat-send-button"
                        style={{ backgroundColor: app.color }}
                        disabled={!inputValue.trim()}
                    >
                        <span className="material-symbols-rounded">send</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 