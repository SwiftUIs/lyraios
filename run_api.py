import uvicorn
import os
import sys

# Add project root directory to Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

if __name__ == "__main__":
    # Update API application path
    uvicorn.run("app.api.main:app", host="0.0.0.0", port=8000, reload=True) 