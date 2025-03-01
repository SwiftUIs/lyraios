import { AppConfig } from '../types';

// API endpoint configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const LLM_ENDPOINT = `${API_BASE_URL}/api/chat`;

/**
 * Get response from LLM API
 * @param app - Current app context
 * @param query - User's message
 * @param messageHistory - Previous messages for context
 * @returns Promise with LLM response
 */
export async function getLLMResponse(
    app: AppConfig,
    query: string,
    messageHistory: Array<{ role: string, content: string }>
): Promise<string> {
    try {
        const response = await fetch(LLM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                app_id: app.id,
                query,
                history: messageHistory,
            }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error getting LLM response:', error);
        // Fallback response in case of error
        return `I'm having trouble connecting to my knowledge base right now. As ${app.name}, I'd typically help with ${app.description || 'your request'}. Please try again in a moment.`;
    }
} 