import { useState, useEffect, useCallback } from 'react';
import { AppConfig } from '../types';
import { AppIcon } from './AppIcon';
import { Taskbar } from './Taskbar';
import { ContextMenu } from './ContextMenu';
import { AnimatePresence } from 'framer-motion';
import lyraLogo from '../assets/images/lyraios.png';
import { formatTime, formatDate, DEFAULT_TIMEZONE, getTimezoneDisplayName } from '@/lib/utils';

interface DesktopProps {
    apps: AppConfig[];
    onAppClick: (app: AppConfig) => void;
}

export function Desktop({ apps, onAppClick }: DesktopProps) {
    const [time, setTime] = useState(new Date());
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [contextMenu, setContextMenu] = useState({
        isOpen: false,
        x: 0,
        y: 0
    });
    const [viewMode, setViewMode] = useState('large');
    const [sortMode, setSortMode] = useState('name');
    const [sortedApps, setSortedApps] = useState<AppConfig[]>(apps);

    const backgrounds = [
        'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
        'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
        'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
        'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
        }, 30000); // Change background every 30 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Sort apps based on sort mode
        const sorted = [...apps].sort((a, b) => {
            if (sortMode === 'name') {
                return a.name.localeCompare(b.name);
            }
            // Other sort modes would be implemented here
            return 0;
        });

        setSortedApps(sorted);
    }, [apps, sortMode]);

    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({
            isOpen: true,
            x: e.clientX,
            y: e.clientY
        });
    }, []);

    const closeContextMenu = useCallback(() => {
        setContextMenu(prev => ({ ...prev, isOpen: false }));
    }, []);

    const handleRefresh = useCallback(() => {
        // Simulate refresh
        closeContextMenu();
    }, [closeContextMenu]);

    const handleViewChange = useCallback((view: string) => {
        setViewMode(view);
        closeContextMenu();
    }, [closeContextMenu]);

    const handleSortChange = useCallback((sort: string) => {
        setSortMode(sort);
        closeContextMenu();
    }, [closeContextMenu]);

    const handleNewFolder = useCallback(() => {
        // Simulate creating a new folder
        closeContextMenu();
    }, [closeContextMenu]);

    const handlePersonalize = useCallback(() => {
        // Open personalization settings
        closeContextMenu();
    }, [closeContextMenu]);

    return (
        <div
            className="desktop-container"
            style={{
                background: backgrounds[backgroundIndex],
                transition: 'background 2s ease-in-out'
            }}
            onContextMenu={handleContextMenu}
        >
            <div className="desktop-logo">
                <img src={lyraLogo} alt="Lyra OS" />
            </div>

            <div className="desktop-time-container">
                <div className="desktop-time">
                    {formatTime(time, { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="desktop-date">
                    {formatDate(time, { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
                <div className="desktop-timezone">
                    {getTimezoneDisplayName()}
                </div>
            </div>

            <div className={`desktop-grid desktop-grid-${viewMode}`}>
                {sortedApps.map((app) => (
                    <AppIcon
                        key={app.id}
                        app={app}
                        onClick={() => onAppClick(app)}
                        viewMode={viewMode}
                    />
                ))}
            </div>

            <Taskbar time={time} onAppClick={onAppClick} />

            <AnimatePresence>
                {contextMenu.isOpen && (
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        isOpen={contextMenu.isOpen}
                        onClose={closeContextMenu}
                        onRefresh={handleRefresh}
                        onViewChange={handleViewChange}
                        onSortChange={handleSortChange}
                        onNewFolder={handleNewFolder}
                        onPersonalize={handlePersonalize}
                        currentView={viewMode}
                        currentSort={sortMode}
                    />
                )}
            </AnimatePresence>
        </div>
    );
} 