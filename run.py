"""LYRAIOS application launcher"""

import sys
import os

# Add current directory to Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

# Import and run main application
from app.main import main

if __name__ == "__main__":
    # Use streamlit to run application
    import streamlit.web.bootstrap as bootstrap
    
    bootstrap.run("app/main.py", "", [], []) 