import logging
from typing import Union
from .base import BaseStorage
from .config import db_settings
from .init import init_database
from .sqlite import SQLiteStorage  # 直接导入

logger = logging.getLogger(__name__)

def get_storage() -> BaseStorage:
    """Get the appropriate storage implementation based on configuration"""
    # Initialize database if auto-create is enabled
    if not init_database():
        raise RuntimeError("Failed to initialize database. Check logs for details.")
    
    try:
        if db_settings.is_sqlite:
            storage = SQLiteStorage()  # 直接使用
            # 测试数据库连接
            storage.get_all_run_ids()  # 如果数据库有问题，这里会抛出异常
            return storage
        elif db_settings.is_postgres:
            from phi.storage.assistant.postgres import PgAssistantStorage
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
        raise RuntimeError("【db】 Could not create assistant, is the database running?") 