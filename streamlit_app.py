"""LYRAIOS Streamlit application entry point"""

import os
import sys
import streamlit as st
from phi.tools.streamlit.components import check_password

# Add project root directory to Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

# Set page configuration
st.set_page_config(
    page_title="LYRAIOS AI Assistant",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Import main application
from app.main import main

# Check password and start main program
if check_password():
    main()
