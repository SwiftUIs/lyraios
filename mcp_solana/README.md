# MCP Solana Integration

This package provides Model Context Protocol (MCP) integration for Solana blockchain operations. It allows AI applications like Claude Desktop and Cursor to interact with the Solana blockchain through the MCP protocol.

## Features

- **Wallet Management**: Retrieve wallet addresses and check balances
- **Transaction Operations**: Transfer SOL and tokens between wallets
- **Smart Contract Interactions**: Deploy and call smart contracts
- **Token Management**: List token accounts and manage tokens

## Architecture

The MCP Solana integration follows the client-server architecture of the Model Context Protocol:

- **MCP Client**: Connects to an MCP server to access Solana capabilities
- **MCP Server**: Provides Solana blockchain operations to MCP clients
- **Transport Layer**: Supports both local (stdio) and remote (HTTP/SSE) communication

## Installation

```bash
# Install from the repository
pip install -e .

# Or install with dependencies
pip install -e ".[dev]"
```

## Usage

### Client Usage

```python
import asyncio
from mcp_solana.client.client import SolanaMCPClient

async def main():
    # Create a client with HTTP transport
    client = SolanaMCPClient(server_url="http://localhost:8080")
    
    try:
        # Initialize the client
        await client.initialize()
        
        # Get wallet address
        address = await client.get_wallet_address()
        print(f"Wallet address: {address}")
        
        # Get wallet balance
        balance = await client.get_wallet_balance(address)
        print(f"Wallet balance: {balance}")
        
        # Transfer SOL
        recipient = "RECIPIENT_ADDRESS_HERE"
        amount = 0.01  # SOL
        tx = await client.transfer_sol(recipient, amount)
        print(f"Transfer transaction: {tx}")
        
    finally:
        # Close the client
        await client.close()

if __name__ == "__main__":
    asyncio.run(main())
```

### Server Configuration

To run the MCP Solana server:

```bash
# Start the server with default configuration
python -m mcp_solana.server.server

# Start the server with custom configuration
python -m mcp_solana.server.server --port 8080 --rpc-url https://api.mainnet-beta.solana.com
```

## Integration with AI Applications

### Claude Desktop Integration

1. Install the MCP Solana server:
   ```bash
   pip install mcp-solana
   ```

2. Add the following to your MCP configuration file:
   ```json
   {
     "solana": {
       "command": "python",
       "args": ["-m", "mcp_solana.server.server"]
     }
   }
   ```

3. Start Claude Desktop and use the Solana capabilities:
   ```
   You: Can you check my Solana wallet balance?
   Claude: I'll check your Solana wallet balance for you.
   [Claude uses MCP to connect to the Solana blockchain]
   Your wallet address is 7Xnw...3jUP and has a balance of 1.45 SOL.
   ```

### Cursor Integration

1. Install the MCP Solana server:
   ```bash
   pip install mcp-solana
   ```

2. Add the following to your MCP configuration file:
   ```json
   {
     "solana": {
       "command": "python",
       "args": ["-m", "mcp_solana.server.server"]
     }
   }
   ```

3. Start Cursor and use the Solana capabilities in your development workflow.

## Development

### Project Structure

```
mcp_solana/
├── client/             # MCP client implementation
├── server/             # MCP server implementation
├── models/             # Data models
├── utils/              # Utility functions
└── examples/           # Example scripts
```

### Running Tests

```bash
# Run all tests
pytest

# Run specific tests
pytest tests/test_client.py
```

### Building Documentation

```bash
# Build documentation
cd docs
make html
```

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details. 