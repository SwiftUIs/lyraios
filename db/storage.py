import os
from typing import Optional, Union, List, Dict, Any
from pathlib import Path
import sqlite3
import json
from datetime import datetime
from phi.storage.assistant.base import AssistantStorage
from phi.storage.assistant.postgres import PgAssistantStorage
from .config import db_settings
from .init import init_database
import logging

logger = logging.getLogger(__name__)

class SQLiteStorage:
    def __init__(self, db_path: Optional[str] = None):
        """Initialize SQLite storage"""
        if db_path is None:
            db_path = db_settings.absolute_db_path
        
        self.db_path = db_path
        self._init_db()
    
    def _init_db(self):
        """Initialize database tables"""
        # 确保目录存在
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS assistant_runs (
                    run_id TEXT PRIMARY KEY,
                    user_id TEXT,
                    assistant_name TEXT,
                    created_at TIMESTAMP,
                    messages TEXT,
                    metadata TEXT
                )
            """)
            conn.commit()
    
    def save_run(self, run_id: str, messages: list, metadata: dict = None, user_id: str = None, assistant_name: str = None):
        """Save a conversation run"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute(
                """
                INSERT OR REPLACE INTO assistant_runs 
                (run_id, user_id, assistant_name, created_at, messages, metadata)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    run_id,
                    user_id,
                    assistant_name,
                    datetime.utcnow().isoformat(),
                    json.dumps(messages),
                    json.dumps(metadata or {})
                )
            )
            conn.commit()
    
    def get_run(self, run_id: str) -> Optional[dict]:
        """Get a conversation run by ID"""
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute(
                "SELECT * FROM assistant_runs WHERE run_id = ?",
                (run_id,)
            )
            row = cursor.fetchone()
            
            if row:
                return {
                    "run_id": row["run_id"],
                    "user_id": row["user_id"],
                    "assistant_name": row["assistant_name"],
                    "created_at": row["created_at"],
                    "messages": json.loads(row["messages"]),
                    "metadata": json.loads(row["metadata"])
                }
            return None 
    
    def delete_run(self, run_id: str) -> None:
        """Delete a conversation run"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("DELETE FROM assistant_runs WHERE run_id = ?", (run_id,))
            conn.commit()
    
    def get_all_runs(self) -> List[Dict[str, Any]]:
        """Get all conversation runs"""
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute("SELECT * FROM assistant_runs ORDER BY created_at DESC")
            rows = cursor.fetchall()
            
            return [
                {
                    "run_id": row["run_id"],
                    "user_id": row["user_id"],
                    "assistant_name": row["assistant_name"],
                    "created_at": row["created_at"],
                    "messages": json.loads(row["messages"]),
                    "metadata": json.loads(row["metadata"])
                }
                for row in rows
            ]
    
    def get_all_run_ids(self) -> List[str]:
        """Get all run IDs"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("SELECT run_id FROM assistant_runs ORDER BY created_at DESC")
            return [row[0] for row in cursor.fetchall()]

def get_storage() -> AssistantStorage:
    """Get the appropriate storage implementation based on configuration"""
    # Initialize database if auto-create is enabled
    if not init_database():
        raise RuntimeError("Failed to initialize database. Check logs for details.")
    
    try:
        if db_settings.is_sqlite:
            # 延迟导入以避免循环依赖
            from ai.storage import SQLiteAssistantStorage
            storage = SQLiteAssistantStorage()
            # 测试数据库连接
            storage.get_all_run_ids()  # 如果数据库有问题，这里会抛出异常
            return storage
        elif db_settings.is_postgres:
            storage = PgAssistantStorage(
                table_name="lyraios_storage",
                db_url=db_settings.db_url
            )
            # 测试数据库连接
            storage.get_all_run_ids()
            return storage
        else:
            raise ValueError(f"Unsupported database type: {db_settings.DATABASE_TYPE}")
    except Exception as e:
        logger.error(f"Failed to create storage: {e}")
        raise RuntimeError("[storage] Could not create assistant, is the database running?") 