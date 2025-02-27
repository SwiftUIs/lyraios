"""LYRAIOS main application entry"""

import nest_asyncio
import streamlit as st
from phi.tools.streamlit.components import check_password
import base64
from pathlib import Path

# Use absolute import
import sys
import os

# Add project root directory to Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(os.path.dirname(__file__))))

from app.styles.css import get_css_styles
from app.utils.session import init_session_state
from app.components.sidebar import setup_sidebar
from app.components.chat import render_chat_interface
# Import database and configuration modules
from app.db.models import ChatMessage
from app.config.settings import app_settings

# Apply nest_asyncio
nest_asyncio.apply()

def get_base64_encoded_image(image_path):
    """Get base64 encoded image"""
    with open(image_path, "rb") as img_file:
        return base64.b64encode(img_file.read()).decode()

def setup_page():
    """Setup page configuration and styles"""
    
    # Set page configuration
    st.set_page_config(
        page_title=app_settings.app_name,
        layout="wide",
        initial_sidebar_state="expanded"
    )
    
    # Apply CSS styles
    st.markdown(get_css_styles(), unsafe_allow_html=True)
    
    favicon_html = f"""
    <link rel="shortcut icon" href="https://lyraaios.xyz/logo.png">
    """
    st.markdown(favicon_html, unsafe_allow_html=True)

def main():
    """Main function"""
    # Setup page configuration
    setup_page()
    
    # Initialize session state
    init_session_state()
    
    st.markdown("<h1 style='margin-top: 15px;'><img src='https://lyraaios.xyz/logo.png' width='80' height='80'> LYRAIOS</h1>", unsafe_allow_html=True)
    st.markdown("<p style='font-size: 14px; color: #666;'>LYRAIOS is an advanced AI assistant platform built with LLM Agent, designed to serve as an operating system for AI applications, learn more on GitHub <a href='https://github.com/GalaxyLLMCI/lyraios' target='_blank'>lyraios</a></p>", unsafe_allow_html=True)
    
    # Usage guide
    with st.expander("📚 Usage guide"):
        st.markdown("""
        ### Examples:
        
        - **Knowledge Base Query**: Try adding an article like Sam Altman's blog post (https://blog.samaltman.com/what-i-wish-someone-had-told-me) and then ask: "What key insights did Sam Altman share in his blog?"
        - **Web Search**: "What are the latest developments in France?"
        - **Calculations**: "Calculate the factorial of 10"
        - **Financial Data**: "What is the current stock price of AAPL?"
        - **Financial Analysis**: "Compare NVIDIA and AMD stocks, analyze their financial metrics, and summarize the key differences"
        - **Research Reports**: "Create a comprehensive report on IBM's acquisition of Hashicorp"
        """)
    
    # Set sidebar
    user_id = setup_sidebar()
    
    if user_id:
        # Render chat interface
        render_chat_interface(user_id)
    else:
        st.info("👤 Please enter a username in the sidebar to start the conversation")

# Only execute when this file is run directly
if __name__ == "__main__":
    # Check password and start main program
    if check_password():
        main() 