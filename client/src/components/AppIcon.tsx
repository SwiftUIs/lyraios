import { useState, useEffect, useRef } from 'react';
import { AppConfig } from '../types';
import { cn } from '@/lib/utils';

interface AppIconProps {
    app: AppConfig;
    onClick: () => void;
    viewMode?: string;
}

export function AppIcon({ app, onClick, viewMode = 'large' }: AppIconProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipTimerRef = useRef<number | null>(null);

    // Helper function to clear the tooltip timer
    const clearTooltipTimer = () => {
        if (tooltipTimerRef.current !== null) {
            window.clearTimeout(tooltipTimerRef.current);
            tooltipTimerRef.current = null;
        }
    };

    // Clear the timer when the component unmounts
    useEffect(() => {
        return () => clearTooltipTimer();
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);

        // Clear the previous timer
        clearTooltipTimer();

        // Set a new timer to display the tooltip
        tooltipTimerRef.current = window.setTimeout(() => {
            setShowTooltip(true);
        }, 500);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);

        // Clear the timer
        clearTooltipTimer();

        // Immediately hide the tooltip
        setShowTooltip(false);
    };

    const handleClick = () => {
        // Set active state briefly for visual feedback
        setIsActive(true);
        setTimeout(() => setIsActive(false), 200);

        // Call the provided onClick handler
        onClick();
    };

    return (
        <div
            className={cn(
                "app-icon-container",
                `app-icon-${viewMode}`,
                isActive && "active"
            )}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={cn(
                    "app-icon-circle",
                    isHovered && "app-icon-circle-hover"
                )}
                style={{ backgroundColor: app.color }}
            >
                <span className="material-symbols-rounded">{app.icon}</span>
            </div>
            <div className="app-icon-name">{app.name}</div>

            {showTooltip && app.description && (
                <div className="app-tooltip">
                    {app.description}
                </div>
            )}
        </div>
    );
} 