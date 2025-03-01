import { AppConfig } from '../types';

// Mock API response data
const mockApps: AppConfig[] = [
];

// API endpoint configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const APPS_ENDPOINT = `${API_BASE_URL}/api/apps`;

/**
 * Fetch all available applications
 * @returns Promise with array of AppConfig objects
 */
export async function fetchApps(): Promise<AppConfig[]> {
    try {
        const response = await fetch(APPS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching apps:', error);
        // Fallback to mock data in case of error
        return mockApps;
    }
}

/**
 * Get app by ID
 * @param id - App ID to find
 * @returns Promise with AppConfig or null if not found
 */
export async function getAppById(id: string): Promise<AppConfig | null> {
    const apps = await fetchApps();
    return apps.find(app => app.id === id) || null;
}

/**
 * Get recommended apps (most used or featured)
 * @param limit - Maximum number of apps to return
 * @returns Promise with array of recommended AppConfig objects
 */
export async function getRecommendedApps(limit: number = 12): Promise<AppConfig[]> {
    const apps = await fetchApps();
    return apps.slice(0, limit);
} 