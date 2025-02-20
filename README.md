# LYRAIOS

## Overview
The LYRAIOS is designed to facilitate the interaction between users and AI-powered tools, providing an efficient way to manage and execute tasks across various platforms. This system leverages multiple functions to perform tasks such as retrieving GitHub discussions, searching code, managing security alerts, and more.


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
