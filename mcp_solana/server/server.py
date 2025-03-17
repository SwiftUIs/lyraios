"""
MCP Solana Server

This module implements the MCP server for Solana blockchain operations.
"""

import argparse
import asyncio
import json
import logging
import os
import sys
from typing import Any, Dict, List, Optional, Union

import solana
from solana.rpc.async_api import AsyncClient
from solana.publickey import PublicKey

from ..models.protocol import (
    MCPRequest,
    MCPResponse,
    MCPNotification,
    MCPError,
    MCPErrorCode,
    SolanaCapability,
    SolanaCapabilityType,
    WalletInfo,
    TokenAccount,
    TransactionInfo,
)

logger = logging.getLogger(__name__)


class SolanaMCPServer:
    """
    MCP Server for Solana blockchain operations.
    
    This server provides Solana blockchain capabilities to MCP clients,
    such as wallet management, transaction signing, and smart contract
    interactions.
    """
    
    def __init__(
        self,
        rpc_url: str = "https://api.devnet.solana.com",
        wallet_path: Optional[str] = None,
    ):
        """
        Initialize the Solana MCP Server.
        
        Args:
            rpc_url: The URL of the Solana RPC endpoint.
            wallet_path: Path to the wallet keystore directory.
                If None, a default path will be used.
        """
        self.rpc_url = rpc_url
        self.wallet_path = wallet_path or os.path.expanduser("~/.solana/wallets")
        self.solana_client = AsyncClient(rpc_url)
        self._wallets: Dict[str, WalletInfo] = {}
        self._request_handlers: Dict[str, callable] = {}
        self._notification_handlers: Dict[str, callable] = {}
        self._initialized = False
        
        # Register request handlers
        self._register_handlers()
    
    async def initialize(self) -> None:
        """
        Initialize the server.
        """
        if self._initialized:
            return
        
        # Load wallets
        await self._load_wallets()
        
        # Test connection to Solana
        try:
            version = await self.solana_client.get_version()
            logger.info(f"Connected to Solana node: {version}")
        except Exception as e:
            logger.error(f"Failed to connect to Solana node: {e}")
            raise
        
        self._initialized = True
        logger.info("Solana MCP server initialized successfully")
    
    async def handle_request(self, request_json: str) -> str:
        """
        Handle an incoming MCP request.
        
        Args:
            request_json: The JSON-encoded request.
            
        Returns:
            The JSON-encoded response.
        """
        try:
            request_data = json.loads(request_json)
            request = MCPRequest(**request_data)
            
            # Check if we have a handler for this method
            handler = self._request_handlers.get(request.method)
            if handler is None:
                error = MCPError(
                    code=MCPErrorCode.METHOD_NOT_FOUND,
                    message=f"Method not found: {request.method}"
                )
                return json.dumps({
                    "jsonrpc": "2.0",
                    "id": request.id,
                    "error": error.dict()
                })
            
            # Call the handler
            try:
                result = await handler(request.params)
                response = MCPResponse(
                    jsonrpc="2.0",
                    id=request.id,
                    result=result
                )
                return json.dumps(response.dict())
            except MCPError as e:
                return json.dumps({
                    "jsonrpc": "2.0",
                    "id": request.id,
                    "error": e.dict()
                })
            except Exception as e:
                logger.error(f"Error handling request: {e}")
                error = MCPError(
                    code=MCPErrorCode.INTERNAL_ERROR,
                    message=str(e)
                )
                return json.dumps({
                    "jsonrpc": "2.0",
                    "id": request.id,
                    "error": error.dict()
                })
                
        except json.JSONDecodeError:
            error = MCPError(
                code=MCPErrorCode.PARSE_ERROR,
                message="Invalid JSON"
            )
            return json.dumps({
                "jsonrpc": "2.0",
                "id": None,
                "error": error.dict()
            })
        except Exception as e:
            logger.error(f"Error parsing request: {e}")
            error = MCPError(
                code=MCPErrorCode.INVALID_REQUEST,
                message=str(e)
            )
            return json.dumps({
                "jsonrpc": "2.0",
                "id": None,
                "error": error.dict()
            })
    
    async def handle_notification(self, notification_json: str) -> None:
        """
        Handle an incoming MCP notification.
        
        Args:
            notification_json: The JSON-encoded notification.
        """
        try:
            notification_data = json.loads(notification_json)
            notification = MCPNotification(**notification_data)
            
            # Check if we have a handler for this method
            handler = self._notification_handlers.get(notification.method)
            if handler is None:
                logger.warning(f"No handler for notification method: {notification.method}")
                return
            
            # Call the handler
            try:
                await handler(notification.params)
            except Exception as e:
                logger.error(f"Error handling notification: {e}")
                
        except json.JSONDecodeError:
            logger.error("Invalid JSON in notification")
        except Exception as e:
            logger.error(f"Error parsing notification: {e}")
    
    async def shutdown(self) -> None:
        """
        Shutdown the server.
        """
        if not self._initialized:
            return
        
        # Close Solana client
        await self.solana_client.close()
        
        self._initialized = False
        logger.info("Solana MCP server shut down")
    
    def _register_handlers(self) -> None:
        """
        Register request and notification handlers.
        """
        # Request handlers
        self._request_handlers = {
            "initialize": self._handle_initialize,
            "get_wallet_address": self._handle_get_wallet_address,
            "get_wallet_balance": self._handle_get_wallet_balance,
            "transfer_sol": self._handle_transfer_sol,
            "deploy_contract": self._handle_deploy_contract,
            "call_contract": self._handle_call_contract,
            "get_token_accounts": self._handle_get_token_accounts,
            "shutdown": self._handle_shutdown,
        }
        
        # Notification handlers
        self._notification_handlers = {
            # Add notification handlers here
        }
    
    async def _load_wallets(self, address) -> None:
        """
        Load wallet information from the wallet directory.
        """
        # In a real implementation, this would load actual wallet files
        # For this example, we'll just create a dummy wallet
        self._wallets = {
            "default": WalletInfo(
                address=address,
                name="default",
                is_default=True
            )
        }
        logger.info(f"Loaded {len(self._wallets)} wallets")
    
    async def _handle_initialize(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle the initialize request.
        
        Args:
            params: The request parameters.
            
        Returns:
            The response result.
        """
        await self.initialize()
        
        # Return server capabilities
        capabilities = [
            SolanaCapability(
                id="wallet",
                type=SolanaCapabilityType.WALLET,
                name="Solana Wallet",
                description="Manage Solana wallets and check balances",
                methods=["get_wallet_address", "get_wallet_balance"]
            ),
            SolanaCapability(
                id="transaction",
                type=SolanaCapabilityType.TRANSACTION,
                name="Solana Transactions",
                description="Send Solana transactions",
                methods=["transfer_sol"]
            ),
            SolanaCapability(
                id="contract",
                type=SolanaCapabilityType.CONTRACT,
                name="Solana Smart Contracts",
                description="Deploy and interact with Solana programs",
                methods=["deploy_contract", "call_contract"]
            ),
            SolanaCapability(
                id="token",
                type=SolanaCapabilityType.TOKEN,
                name="Solana Tokens",
                description="Manage Solana tokens",
                methods=["get_token_accounts"]
            ),
        ]
        
        return {
            "server_info": {
                "name": "solana_mcp_server",
                "version": "0.1.0",
                "rpc_url": self.rpc_url,
            },
            "capabilities": [cap.dict() for cap in capabilities]
        }
    
    async def _handle_get_wallet_address(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle the get_wallet_address request.
        
        Args:
            params: The request parameters.
            
        Returns:
            The response result.
        """
        wallet_name = params.get("wallet_name")
        
        if wallet_name is not None:
            if wallet_name not in self._wallets:
                raise MCPError(
                    code=MCPErrorCode.WALLET_NOT_FOUND,
                    message=f"Wallet not found: {wallet_name}"
                )
            wallet = self._wallets[wallet_name]
        else:
            # Use default wallet
            wallet = next((w for w in self._wallets.values() if w.is_default), None)
            if wallet is None:
                raise MCPError(
                    code=MCPErrorCode.WALLET_NOT_FOUND,
                    message="No default wallet found"
                )
        
        return {
            "address": wallet.address,
            "name": wallet.name
        }
    
    async def _handle_get_wallet_balance(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle the get_wallet_balance request.
        
        Args:
            params: The request parameters.
            
        Returns:
            The response result.
        """
        address = params.get("address")
        
        if address is None:
            # Use default wallet
            wallet = next((w for w in self._wallets.values() if w.is_default), None)
            if wallet is None:
                raise MCPError(
                    code=MCPErrorCode.WALLET_NOT_FOUND,
                    message="No default wallet found"
                )
            address = wallet.address
        
        try:
            # Get balance from Solana
            balance = await self.solana_client.get_balance(PublicKey(address))
            
            return {
                "balance": {
                    "sol": balance["result"]["value"] / 1_000_000_000,  # Convert lamports to SOL
                    "lamports": balance["result"]["value"]
                }
            }
        except Exception as e:
            logger.error(f"Error getting balance: {e}")
            raise MCPError(
                code=MCPErrorCode.INTERNAL_ERROR,
                message=f"Failed to get balance: {str(e)}"
            )
    
    async def _handle_transfer_sol(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle the transfer_sol request.
        
        Args:
            params: The request parameters.
            
        Returns:
            The response result.
        """
        # In a real implementation, this would create and send a transaction
        # For this example, we'll just return a dummy transaction
        # get signature, status, block_time, confirmations, fee, slot from params
        signature = params.get("signature")
        status = params.get("status")
        block_time = params.get("block_time")
        confirmations = params.get("confirmations")
        fee = params.get("fee")
        slot = params.get("slot")
        return {
            "transaction": {
                "signature": signature,
                "status": "confirmed",
                "block_time": block_time,
                "confirmations": confirmations,
                "fee": fee,
                "slot": slot
            }
        }
    
    async def _handle_deploy_contract(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle the deploy_contract request.
        
        Args:
            params: The request parameters.
            
        Returns:
            The response result.
        """
        # In a real implementation, this would deploy a program
        # For this example, we'll just return a dummy deployment
        program_id = params.get("program_id")
        signature = params.get("signature")
        status = params.get("status")
        block_time = params.get("block_time")
        confirmations = params.get("confirmations")
        fee = params.get("fee")
        slot = params.get("slot")
        return {
            "deployment": {
                "program_id": program_id,
                "transaction": {
                    "signature": signature,
                    "status": status,
                    "block_time": block_time,
                    "confirmations": 10,
                    "fee": 5000,
                    "slot": 123456789
                }
            }
        }
    
    async def _handle_call_contract(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle the call_contract request.
        
        Args:
            params: The request parameters.
            
        Returns:
            The response result.
        """
        # In a real implementation, this would call a program
        # For this example, we'll just return a dummy result
        signature = params.get("signature")
        status = params.get("status")
        block_time = params.get("block_time")
        confirmations = params.get("confirmations")
        fee = params.get("fee")
        slot = params.get("slot")
        return {
            "result": {
                "transaction": {
                    "signature": signature,
                    "status": status,
                    "block_time": block_time,
                    "confirmations": confirmations,
                    "fee": fee,
                    "slot": slot
                },
                "data": "AQIDBAUGBwgJCg=="
            }
        }
    
    async def _handle_get_token_accounts(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle the get_token_accounts request.
        
        Args:
            params: The request parameters.
            
        Returns:
            The response result.
        """
        # In a real implementation, this would get token accounts from Solana
        # For this example, we'll just return dummy token accounts
        address = params.get("address")
        mint = params.get("mint")
        owner = params.get("owner")
        amount = params.get("amount")
        decimals = params.get("decimals")
        token_name = params.get("token_name")
        token_symbol = params.get("token_symbol")
        return {
            "token_accounts": [
                {
                    "address": address,
                    "mint": mint,
                    "owner": owner,
                    "amount": amount,
                    "decimals": decimals,
                    "token_name": token_name,
                    "token_symbol": token_symbol
                }
            ]
        }
    
    async def _handle_shutdown(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle the shutdown request.
        
        Args:
            params: The request parameters.
            
        Returns:
            The response result.
        """
        await self.shutdown()
        return {"success": True}


async def run_server(
    rpc_url: str = "https://api.devnet.solana.com",
    wallet_path: Optional[str] = None,
    port: int = 8080,
) -> None:
    """
    Run the MCP Solana server.
    
    Args:
        rpc_url: The URL of the Solana RPC endpoint.
        wallet_path: Path to the wallet keystore directory.
        port: The port to listen on for HTTP connections.
    """
    server = SolanaMCPServer(rpc_url=rpc_url, wallet_path=wallet_path)
    
    # Initialize the server
    await server.initialize()
    
    # In a real implementation, this would start an HTTP server
    # For this example, we'll just use stdin/stdout
    logger.info("MCP Solana server is running (stdin/stdout mode)")
    
    try:
        while True:
            line = await asyncio.to_thread(sys.stdin.readline)
            if not line:
                break
            
            response = await server.handle_request(line.strip())
            sys.stdout.write(response + "\n")
            sys.stdout.flush()
    except KeyboardInterrupt:
        logger.info("Server interrupted")
    finally:
        await server.shutdown()


def main() -> None:
    """
    Main entry point.
    """
    parser = argparse.ArgumentParser(description="MCP Solana Server")
    parser.add_argument(
        "--rpc-url",
        default="https://api.devnet.solana.com",
        help="Solana RPC URL (default: https://api.devnet.solana.com)"
    )
    parser.add_argument(
        "--wallet-path",
        help="Path to wallet keystore directory"
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8080,
        help="Port to listen on for HTTP connections (default: 8080)"
    )
    parser.add_argument(
        "--log-level",
        default="INFO",
        choices=["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"],
        help="Logging level (default: INFO)"
    )
    
    args = parser.parse_args()
    
    # Configure logging
    logging.basicConfig(
        level=getattr(logging, args.log_level),
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    
    # Run the server
    asyncio.run(run_server(
        rpc_url=args.rpc_url,
        wallet_path=args.wallet_path,
        port=args.port
    ))


if __name__ == "__main__":
    main() 