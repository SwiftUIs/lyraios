import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { AppConfig } from '../types';
import { formatTime, formatDate } from '@/lib/utils';
import { getRecommendedApps } from '@/services/appService';

interface TaskbarProps {
    time: Date;
    onAppClick: (app: AppConfig) => void;
}

export function Taskbar({ time, onAppClick }: TaskbarProps) {
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredApps, setFilteredApps] = useState<AppConfig[]>([]);
    const [activeQuickApp, setActiveQuickApp] = useState<string | null>(null);
    const [recommendedApps, setRecommendedApps] = useState<AppConfig[]>([]);
    const [allApps, setAllApps] = useState<AppConfig[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Load recommended apps
    useEffect(() => {
        const loadRecommendedApps = async () => {
            try {
                const apps = await getRecommendedApps(12);
                setRecommendedApps(apps);
                setAllApps(apps);
            } catch (error) {
                console.error('Error loading recommended apps:', error);
            }
        };

        loadRecommendedApps();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = allApps.filter(app =>
                app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (app.description && app.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setFilteredApps(filtered);
        } else {
            setFilteredApps([]);
        }
    }, [searchQuery, allApps]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Handle search input blur
    const handleSearchBlur = () => {
        if (!searchQuery.trim()) {
            setIsSearchOpen(false);
        }
    };

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.start-menu') && !target.closest('.taskbar-start-button')) {
                setIsStartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleStartToggle = () => {
        setIsStartOpen(!isStartOpen);
        setIsSearchOpen(false);
    };

    const handleSearchToggle = () => {
        setIsSearchOpen(true);
        setIsStartOpen(false);
    };

    const handleAppClick = (app: AppConfig) => {
        onAppClick(app);
        setIsStartOpen(false);
        setIsSearchOpen(false);
    };

    const handleQuickAppClick = (appType: string) => {
        // Set active state briefly for visual feedback
        setActiveQuickApp(appType);
        setTimeout(() => setActiveQuickApp(null), 200);

        // Find and open the corresponding app
        const appMap: Record<string, string> = {
            'folder': 'files',
            'language': 'browser',
            'mail': 'messenger'
        };

        const appId = appMap[appType];
        if (appId) {
            const app = allApps.find(a => a.id === appId);
            if (app) {
                onAppClick(app);
            }
        }
    };

    return (
        <div className="taskbar">
            <div className="taskbar-left">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn("taskbar-start-button", isStartOpen && "active")}
                    onClick={handleStartToggle}
                >
                    <span className="material-symbols-rounded">apps</span>
                </Button>

                <AnimatePresence>
                    {isStartOpen && (
                        <motion.div
                            className="start-menu"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="start-menu-header">
                                <h3>Recommended Apps</h3>
                            </div>
                            <div className="start-menu-grid">
                                {recommendedApps.map(app => (
                                    <div
                                        key={app.id}
                                        className="start-menu-app"
                                        onClick={() => {
                                            handleAppClick(app);
                                        }}
                                    >
                                        <div
                                            className="start-menu-app-icon"
                                            style={{ backgroundColor: app.color }}
                                        >
                                            <span className="material-symbols-rounded">{app.icon}</span>
                                        </div>
                                        <div className="start-menu-app-name">{app.name}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="start-menu-footer">
                                <Button
                                    variant="ghost"
                                    className="start-menu-all-apps"
                                    onClick={() => {
                                        // Show all apps view
                                    }}
                                >
                                    <span className="material-symbols-rounded">grid_view</span>
                                    <span>All apps</span>
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="taskbar-search-wrapper">
                    <AnimatePresence>
                        {isSearchOpen ? (
                            <motion.div
                                className="taskbar-search-input-container"
                                initial={{ width: 40, opacity: 0 }}
                                animate={{ width: 300, opacity: 1 }}
                                exit={{ width: 40, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <input
                                    ref={searchInputRef}
                                    className="taskbar-search-input"
                                    placeholder="Search apps..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onBlur={handleSearchBlur}
                                />

                                {searchQuery && filteredApps.length > 0 && (
                                    <div className="search-results">
                                        {filteredApps.map(app => (
                                            <div
                                                key={app.id}
                                                className="search-result-item"
                                                onClick={() => handleAppClick(app)}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                <div
                                                    className="search-result-icon"
                                                    style={{ backgroundColor: app.color }}
                                                >
                                                    <span className="material-symbols-rounded">{app.icon}</span>
                                                </div>
                                                <div className="search-result-details">
                                                    <div className="search-result-name">{app.name}</div>
                                                    {app.description && (
                                                        <div className="search-result-description">{app.description}</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn("taskbar-search-button", isSearchOpen && "active")}
                                    onClick={handleSearchToggle}
                                >
                                    <span className="material-symbols-rounded">search</span>
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="taskbar-quick-apps">
                    <span
                        className={cn("material-symbols-rounded", activeQuickApp === 'folder' && "active")}
                        onClick={() => handleQuickAppClick('folder')}
                    >
                        folder
                    </span>
                    <span
                        className={cn("material-symbols-rounded", activeQuickApp === 'language' && "active")}
                        onClick={() => handleQuickAppClick('language')}
                    >
                        language
                    </span>
                    <span
                        className={cn("material-symbols-rounded", activeQuickApp === 'mail' && "active")}
                        onClick={() => handleQuickAppClick('mail')}
                    >
                        mail
                    </span>
                </div>
            </div>

            <div className="taskbar-right">
                <div className="taskbar-time">
                    {formatTime(time, { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="taskbar-date">
                    {formatDate(time, { month: 'short', day: 'numeric' })}
                </div>
                <div className="taskbar-icons">
                    <span className="material-symbols-rounded">wifi</span>
                    <span className="material-symbols-rounded">volume_up</span>
                    <span className="material-symbols-rounded">battery_full</span>
                </div>
            </div>
        </div>
    );
} 