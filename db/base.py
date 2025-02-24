from typing import Optional, List, Dict, Any
from abc import ABC, abstractmethod

class BaseStorage(ABC):
    """Base storage interface"""
    
    @abstractmethod
    def save_run(
        self,
        run_id: str,
        messages: List[Dict[str, Any]],
        metadata: Optional[Dict[str, Any]] = None,
        user_id: Optional[str] = None,
        assistant_name: Optional[str] = None,
    ) -> None:
        """Save a conversation run"""
        pass
    
    @abstractmethod
    def get_run(self, run_id: str) -> Optional[Dict[str, Any]]:
        """Get a conversation run by ID"""
        pass
    
    @abstractmethod
    def delete_run(self, run_id: str) -> None:
        """Delete a conversation run"""
        pass
    
    @abstractmethod
    def get_all_runs(self) -> List[Dict[str, Any]]:
        """Get all conversation runs"""
        pass
    
    @abstractmethod
    def get_all_run_ids(self) -> List[str]:
        """Get all run IDs"""
        pass 