# LYRAIOS

## Overview

LYRAIOS (LLM-based Your Reliable AI Operating System) is an advanced AI assistant platform built with FastAPI and Streamlit, designed to serve as an operating system for AI applications:

### Core OS Features
- **AI Process Management**: 
  - Dynamic task allocation and scheduling
  - Multi-assistant coordination and communication
  - Resource optimization and load balancing
  - State management and persistence

- **AI Memory System**:
  - Short-term conversation memory
  - Long-term vector database storage
  - Cross-session context preservation
  - Knowledge base integration

- **AI I/O System**:
  - Multi-modal input processing (text, files, APIs)
  - Structured output formatting
  - Stream processing capabilities
  - Event-driven architecture

### Built-in Tools
- **Calculator**: Advanced mathematical operations including factorial and prime number checking
- **Web Search**: Integrated DuckDuckGo search with customizable result limits
- **Financial Analysis**: 
  - Real-time stock price tracking
  - Company information retrieval
  - Analyst recommendations
  - Financial news aggregation
- **File Management**: Read, write, and list files in the workspace
- **Research Tools**: Integration with Exa for comprehensive research capabilities

### Specialized Assistant Team
- **Python Assistant**: 
  - Live Python code execution
  - Streamlit charting capabilities
  - Package management with pip
- **Research Assistant**: 
  - NYT-style report generation
  - Automated web research
  - Structured output formatting
  - Source citation and reference management

### Technical Architecture
- **FastAPI Backend**: RESTful API with automatic documentation
- **Streamlit Frontend**: Interactive web interface
- **Vector Database**: PGVector for efficient knowledge storage and retrieval
- **PostgreSQL Storage**: Persistent storage for conversations and assistant states
- **Docker Support**: Containerized deployment for development and production

### System Features
- **Knowledge Management**: 
  - PDF document processing
  - Website content integration
  - Vector-based semantic search
  - Knowledge graph construction
- **Process Control**: 
  - Task scheduling and prioritization
  - Resource allocation
  - Error handling and recovery
  - Performance monitoring
- **Security & Access Control**:
  - API key management
  - Authentication and authorization
  - Rate limiting and quota management
  - Secure data storage

## Setup Workspace
```sh
# Clone the repo
git clone https://github.com/GalaxyLLMCI/lyraios
cd lyraios

# Create + activate a virtual env
python3 -m venv aienv
source aienv/bin/activate

# Install phidata
pip install 'phidata[aws]'

# Setup workspace
phi ws setup

# Copy example secrets
cp workspace/example_secrets workspace/secrets

# Create .env file
cp example.env .env

# Run Lyraios locally
phi ws up

# Open [localhost:8501](http://localhost:8501) to view the Streamlit App.

# Stop Lyraios locally
phi ws down
```

## Run Lyraios locally

1. Install [docker desktop](https://www.docker.com/products/docker-desktop)

2. Export credentials

We use gpt-4o as the LLM, so export your OpenAI API Key

```sh
export OPENAI_API_KEY=sk-***

# To use Exa for research, export your EXA_API_KEY (get it from [here](https://dashboard.exa.ai/api-keys))
export EXA_API_KEY=xxx

# To use Gemini for research, export your GOOGLE_API_KEY (get it from [here](https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/overview?project=lyraios))
export GOOGLE_API_KEY=xxx


# OR set them in the `.env` file
OPENAI_API_KEY=xxx
EXA_API_KEY=xxx
GOOGLE_API_KEY=xxx

# Start the workspace using:
phi ws up

# Open [localhost:8501](http://localhost:8501) to view the Streamlit App.

# Stop the workspace using:
phi ws down
```
