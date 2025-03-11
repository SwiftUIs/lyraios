# Tool Integration Guide

This guide explains how to integrate tools with the LYRAIOS Tool Integration Protocol.

## Overview

The Tool Integration Protocol allows you to extend LYRAIOS with custom tools and services. Tools can be implemented as:

- REST APIs
- Python plugins
- WebAssembly modules
- Custom adapters

## Tool Manifest

Every tool requires a manifest that describes its capabilities, parameters, and requirements. The manifest is a JSON file with the following structure:

```json
{
  "schema_version": "1.0",
  "tool_id": "unique-tool-identifier",
  "name": "Tool Display Name",
  "version": "1.0.0",
  "description": "Detailed description of the tool functionality",
  "author": "Tool Author or Organization",
  "homepage": "https://tool-documentation-url.com",
  "license": "MIT",
  "categories": ["category1", "category2"],
  "tags": ["tag1", "tag2"],
  "capabilities": [
    {
      "capability_id": "unique-capability-id",
      "name": "Capability Name",
      "description": "What this capability does",
      "parameters": {
        "type": "object",
        "properties": {
          "param1": {
            "type": "string",
            "description": "Description of parameter 1"
          },
          "param2": {
            "type": "number",
            "description": "Description of parameter 2"
          }
        },
        "required": ["param1"]
      },
      "returns": {
        "type": "object",
        "properties": {
          "result": {
            "type": "string",
            "description": "Description of the return value"
          }
        }
      },
      "examples": [
        {
          "input": {"param1": "example", "param2": 42},
          "output": {"result": "example output"}
        }
      ]
    }
  ],
  "authentication": {
    "type": "api_key",
    "required": true,
    "location": "header",
    "name": "X-API-Key"
  },
  "rate_limits": {
    "requests_per_minute": 60,
    "burst": 10
  },
  "dependencies": [
    {
      "tool_id": "another-tool-id",
      "version_constraint": ">=1.0.0"
    }
  ],
  "platform_requirements": {
    "min_lyraios_version": "1.0.0",
    "supported_platforms": ["linux", "macos", "windows"]
  }
}
```

## Tool Implementation

### Python Plugin

Python plugins are the simplest way to implement tools. Create a Python module with functions that match your capability IDs:

```python
def capability_id(parameters, context):
    """
    Implement your capability.
    
    Args:
        parameters: Input parameters
        context: Execution context
        
    Returns:
        Result dictionary
    """
    # Process parameters
    result = do_something(parameters)
    
    # Return result
    return {
        "result": result
    }
```

### REST API

For REST API tools, you need to implement endpoints that match your capability IDs. In your manifest, specify the endpoint and method in the capability metadata:

```json
{
  "capability_id": "my_capability",
  "name": "My Capability",
  "description": "What this capability does",
  "parameters": { ... },
  "returns": { ... },
  "metadata": {
    "endpoint": "/api/my-capability",
    "method": "POST"
  }
}
```

## Registering Tools

To register a tool, use the Tool Registry API:

```python
import httpx
import json

# Load manifest
with open("tool_manifest.json", "r") as f:
    manifest = json.load(f)

# Create implementation
implementation = {
    "implementation_type": "python_plugin",
    "config": {
        "plugin_path": "/path/to/plugin.py",
        "sandbox_enabled": True
    }
}

# Register tool
async with httpx.AsyncClient() as client:
    response = await client.post(
        "http://localhost:8000/api/v1/tools/register",
        json={
            "manifest": manifest,
            "implementation": implementation
        },
        headers={
            "X-API-Key": "your-api-key"
        }
    )

print(response.json())
```

## Using Tools

Once registered, tools can be used by LYRAIOS agents or directly through the API:

```python
import httpx

# Execute capability
async with httpx.AsyncClient() as client:
    response = await client.post(
        "http://localhost:8000/api/v1/tools/tool-id/capabilities/capability-id/execute",
        json={
            "parameters": {"param1": "value1", "param2": 42},
            "context": {}
        },
        headers={
            "X-API-Key": "your-api-key"
        }
    )

print(response.json())
```

## Best Practices

1. **Descriptive Manifests**: Provide detailed descriptions and examples
2. **Input Validation**: Validate all input parameters
3. **Error Handling**: Return clear error messages
4. **Idempotency**: Make capabilities idempotent when possible
5. **Resource Management**: Release resources in shutdown method
6. **Documentation**: Document your tool's capabilities and usage

## Examples

See the [examples directory](../examples/) for sample tools and usage. 