from pathlib import Path

# Base settings
BASE_DIR = Path(__file__).resolve().parent.parent

# AI settings
AI_MODEL_CONFIG = {
    "model_name": "gpt-3.5-turbo",
    "temperature": 0.7,
    "max_tokens": 1000
}

# API settings
API_VERSION = "v1"
API_PREFIX = f"/api/{API_VERSION}"

# Application settings
DEBUG = True
ALLOWED_HOSTS = ["*"] 