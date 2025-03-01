import { AppConfig } from '../types';
import { fetchApps } from '../services/appService';

// Empty initial array
export const appConfigs: AppConfig[] = [];

// Function to load apps
export async function loadApps(): Promise<AppConfig[]> {
    try {
        const apps = await fetchApps();

        // Update the appConfigs array with fetched data
        appConfigs.length = 0; // Clear the array
        appConfigs.push(...apps); // Add all fetched apps

        return apps;
    } catch (error) {
        console.error('Failed to load apps:', error);
        return [];
    }
} 