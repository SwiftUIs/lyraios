from phi.llm.openai import OpenAIChat as PhiOpenAIChat
from openai import OpenAI
from ai.settings import ai_settings

class CustomOpenAIChat(PhiOpenAIChat):
    def __init__(self, base_url: str = None, **kwargs):
        super().__init__(**kwargs)
        # Initialize OpenAI client with custom base URL and API key
        client_params = {
            "api_key": ai_settings.openai_api_key,  # 显式传递 API key
        }
        
        if base_url:
            client_params["base_url"] = base_url
            
        self.client = OpenAI(**client_params)
        
    def get_client(self) -> OpenAI:
        """Override to return our custom client"""
        return self.client 