import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ContextMenuProps {
    x: number;
    y: number;
    isOpen: boolean;
    onClose: () => void;
    onRefresh: () => void;
    onViewChange: (view: string) => void;
    onSortChange: (sort: string) => void;
    onNewFolder: () => void;
    onPersonalize: () => void;
    currentView: string;
    currentSort: string;
}

export function ContextMenu({
    x,
    y,
    isOpen,
    onClose,
    onRefresh,
    onViewChange,
    onSortChange,
    onNewFolder,
    onPersonalize,
    currentView,
    currentSort
}: ContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Adjust position if menu would go off screen
    const adjustedX = Math.min(x, window.innerWidth - 240);
    const adjustedY = Math.min(y, window.innerHeight - 350);

    return (
        <motion.div
            ref={menuRef}
            className="context-menu"
            style={{ top: adjustedY, left: adjustedX }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
        >
            <div className="context-menu-group">
                <div className="context-menu-item" onClick={onViewChange.bind(null, 'large')}>
                    <span className="material-symbols-rounded">view_module</span>
                    <span>View</span>
                    <span className="context-menu-arrow">▶</span>
                    <div className="context-submenu">
                        <div
                            className={cn("context-menu-item", currentView === 'large' && "context-menu-item-active")}
                            onClick={(e) => { e.stopPropagation(); onViewChange('large'); }}
                        >
                            <span className="material-symbols-rounded">apps</span>
                            <span>Large icons</span>
                            {currentView === 'large' && <span className="material-symbols-rounded">check</span>}
                        </div>
                        <div
                            className={cn("context-menu-item", currentView === 'medium' && "context-menu-item-active")}
                            onClick={(e) => { e.stopPropagation(); onViewChange('medium'); }}
                        >
                            <span className="material-symbols-rounded">grid_view</span>
                            <span>Medium icons</span>
                            {currentView === 'medium' && <span className="material-symbols-rounded">check</span>}
                        </div>
                        <div
                            className={cn("context-menu-item", currentView === 'small' && "context-menu-item-active")}
                            onClick={(e) => { e.stopPropagation(); onViewChange('small'); }}
                        >
                            <span className="material-symbols-rounded">apps_outage</span>
                            <span>Small icons</span>
                            {currentView === 'small' && <span className="material-symbols-rounded">check</span>}
                        </div>
                        <div
                            className={cn("context-menu-item", currentView === 'list' && "context-menu-item-active")}
                            onClick={(e) => { e.stopPropagation(); onViewChange('list'); }}
                        >
                            <span className="material-symbols-rounded">format_list_bulleted</span>
                            <span>List</span>
                            {currentView === 'list' && <span className="material-symbols-rounded">check</span>}
                        </div>
                    </div>
                </div>
                <div className="context-menu-item" onClick={onSortChange.bind(null, 'name')}>
                    <span className="material-symbols-rounded">sort</span>
                    <span>Sort by</span>
                    <span className="context-menu-arrow">▶</span>
                    <div className="context-submenu">
                        <div
                            className={cn("context-menu-item", currentSort === 'name' && "context-menu-item-active")}
                            onClick={(e) => { e.stopPropagation(); onSortChange('name'); }}
                        >
                            <span>Name</span>
                            {currentSort === 'name' && <span className="material-symbols-rounded">check</span>}
                        </div>
                        <div
                            className={cn("context-menu-item", currentSort === 'size' && "context-menu-item-active")}
                            onClick={(e) => { e.stopPropagation(); onSortChange('size'); }}
                        >
                            <span>Size</span>
                            {currentSort === 'size' && <span className="material-symbols-rounded">check</span>}
                        </div>
                        <div
                            className={cn("context-menu-item", currentSort === 'type' && "context-menu-item-active")}
                            onClick={(e) => { e.stopPropagation(); onSortChange('type'); }}
                        >
                            <span>Item type</span>
                            {currentSort === 'type' && <span className="material-symbols-rounded">check</span>}
                        </div>
                        <div
                            className={cn("context-menu-item", currentSort === 'date' && "context-menu-item-active")}
                            onClick={(e) => { e.stopPropagation(); onSortChange('date'); }}
                        >
                            <span>Date modified</span>
                            {currentSort === 'date' && <span className="material-symbols-rounded">check</span>}
                        </div>
                    </div>
                </div>
                <div className="context-menu-item" onClick={onRefresh}>
                    <span className="material-symbols-rounded">refresh</span>
                    <span>Refresh</span>
                </div>
            </div>

            <div className="context-menu-divider"></div>

            <div className="context-menu-group">
                <div className="context-menu-item" onClick={onNewFolder}>
                    <span className="material-symbols-rounded">create_new_folder</span>
                    <span>New folder</span>
                </div>
                <div className="context-menu-item">
                    <span className="material-symbols-rounded">note_add</span>
                    <span>New item</span>
                    <span className="context-menu-arrow">▶</span>
                    <div className="context-submenu">
                        <div className="context-menu-item">
                            <span className="material-symbols-rounded">description</span>
                            <span>Text Document</span>
                        </div>
                        <div className="context-menu-item">
                            <span className="material-symbols-rounded">image</span>
                            <span>Bitmap Image</span>
                        </div>
                        <div className="context-menu-item">
                            <span className="material-symbols-rounded">shortcut</span>
                            <span>Shortcut</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="context-menu-divider"></div>

            <div className="context-menu-group">
                <div className="context-menu-item" onClick={onPersonalize}>
                    <span className="material-symbols-rounded">wallpaper</span>
                    <span>Personalize</span>
                </div>
                <div className="context-menu-item">
                    <span className="material-symbols-rounded">settings</span>
                    <span>Display settings</span>
                </div>
            </div>
        </motion.div>
    );
} 