# LYRAIOS

[English]([README.md])| 简体中文

## 概述 & 技术基础

LYRAI 是一种面向多AI代理（AGENT）的模型上下文协议（MCP）操作系统，旨在扩展AI应用程序（如Claude Desktop和Cursor）的功能，使其能够与金融网络和区块链公链进行交互。该服务器提供了一系列先进的AI助手，包括区块链公链操作（如SOLANA、ETH等——检索钱包地址、列出钱包余额、转账、部署智能合约、链上借贷、调用合约功能、管理代币）、金融科技市场分析与总结报告，以及为教育领域设计的学习与培训系统。
> 未来 LYRAIOS 运营中，VIP 高级功能将仅支持使用 LYRAI 在 Solana 上支付，LYRAI 合约地址（CA）：A6MTWuHbXqjH3vYEfbs3mzvGThQtk5S12FjmdpVkpump

*欢迎体验我们的 LYRA MCP-OS Demo！**

https://github.com/user-attachments/assets/479cad58-ce4b-4901-93ff-e60a98c477d4


## 核心创新 & 差异化价值

LYRAIOS 旨在构建下一代 AI 代理操作系统，在以下三个维度实现技术突破：

1. 开放协议架构：
    * 领先的模块化集成协议，支持即插即用的第三方工具/服务
    * 兼容多模态交互接口（API/插件/智能硬件）
    * 扩展性提升 80% 以上，优于传统框架
2. 多代理协作引擎：
    * 突破单一 AI 代理能力边界
    * 通过分布式任务编排系统实现动态多代理协作
    * 支持企业级复杂工作流自动化与冲突解决机制
3. 跨平台运行环境：
    * 构建跨终端 AI 运行环境
    * 支持从个人智能助手无缝迁移到企业数字员工
    * 可广泛适用于金融、医疗、智能制造等行业的多场景解决方案验证


详细架构信息请参考：[架构文档](docs/ARCHITECTURE.md)


## 系统架构

LYRAIOS 采用分层架构设计，从上到下包括用户界面层、核心操作系统层、MCP 集成层、外部服务层。

![LYRAIOS Architecture](docs/lyraios-architecture.jpg)

<p align="center">
   VS
</p>

![MANUS Architecture](docs/manus-architecture.png)

### 用户界面层

用户界面层提供多种交互方式，使用户能够与 AI OS 进行交互。

#### 主要组件:

- **Web UI**:基于 Streamlit 提供直观的用户界面
- **Mobile UI**: 移动端适配，支持移动设备访问
- **CLI**: 命令行界面, 适用于开发者和高级用户
- **API Clients**: 提供 API 接口，支持第三方应用集成

### 核心操作系统层

核心 OS 层实现 AI 操作系统的基础功能，包括进程管理、内存系统、I/O 系统和安全控制。

#### 主要功能:

- **进程管理**
  - 任务调度：动态分配 AI 任务
  - 资源分配：优化 AI 资源使用
  - 状态管理：维护 AI 进程状态

- **Memory System**
  - 短期记忆：会话上下文维护
  - 长期存储：持久化知识存储
  - 知识库：结构化知识管理

- **I/O 系统**
  - 多模态输入：处理文本、文件、API 请求等
  - 结构化输出：生成格式化的输出结果
  - 事件处理：响应系统事件

- **安全和访问控制**
  - 身份验证：用户身份认证
  - 权限管理：细粒度访问控制
  - 速率限制：防止滥用

### MCP 集成层

MCP（模型上下文协议）集成层是系统的核心创新点，通过 MCP 实现与外部服务的无缝集成。

#### 主要组件：

* MCP 客户端
    * 处理 MCP 协议消息
    * 管理 MCP 服务器的连接
    * 进行消息路由
* 工具注册表
    * 注册外部工具和服务
    * 发现工具能力
    * 验证工具清单
* 工具执行器
    * 提供工具执行环境
    * 管理工具执行所需资源
    * 处理执行错误
* 适配器
    * REST API 适配器
    * Python 插件适配器
    * 自定义适配器

### 外部服务层

外部服务层包括通过 MCP 协议集成的各种外部服务，它们作为 MCP 服务器提供能力。

#### 主要组件：

* 文件系统：提供文件读写能力
* 数据库：提供数据存储和查询能力
* Web 搜索：提供互联网搜索能力
* 代码编辑器：提供代码编辑和执行能力
* 浏览器：提供网页浏览和交互能力
* 自定义服务：支持其他外部服务集成


## 工具集成协议

工具集成协议是LYRAIOS开放式协议架构的关键组成部分。它提供了一种标准化方式将第三方工具和服务集成到LYRAIOS生态系统中。

### 主要特性

- **标准化工具清单**：使用JSON模式定义工具，描述其能力、参数和要求
- **可插拔适配器系统**：支持不同工具类型（REST API、Python插件等）
- **安全执行环境**：工具在受控环境中运行，具有资源限制和权限检查
- **版本和依赖管理**：跟踪工具版本和依赖关系
- **监控和日志记录**：工具执行的完整日志记录

### 工具集成入门

1. **定义工具清单**：创建描述工具能力的JSON文件
2. **实现工具**：根据协议开发工具功能
3. **注册工具**：使用API将工具注册到LYRAIOS
4. **使用工具**：您的工具现在可供LYRAIOS代理使用

示例和详细文档请参阅[工具集成指南](docs/tool_integration.md)。

## MCP协议概述

模型上下文协议（MCP）是用于连接LLM应用和集成的客户端-服务器架构协议。在MCP中：

- **主机**是发起连接的LLM应用（如Claude Desktop或IDE）
- **客户端**与主机应用中的服务器保持1:1连接
- **服务器**向客户端提供上下文、工具和提示

### MCP功能支持

LYRAIOS支持以下MCP功能：

- **资源**：允许附加本地文件和数据
- **提示**：支持提示模板
- **工具**：集成执行命令和脚本
- **采样**：支持采样功能（计划中）
- **根目录**：支持根目录功能（计划中）

## 数据流

### 用户请求处理流程

1. 用户通过接口层发送请求
2. 核心OS层接收并处理请求
3. 如需外部工具支持，请求转发至MCP集成层
4. MCP客户端连接对应MCP服务器
5. 外部服务执行请求并返回结果
6. 结果通过各层返回用户

### 工具执行流程

1. AI代理确定需要特定工具
2. 工具注册表查找工具定义和能力
3. 工具执行器准备执行环境
4. 适配器转换请求为工具可理解格式
5. 工具执行并返回结果
6. 结果返回AI代理处理

## 概述
LYRAIOS（基于LLM的可靠AI操作系统）是用Streamlit构建的高级AI助手平台，旨在作为AI应用的操作系统。

### 核心OS功能
- **AI进程管理**： 
  - 动态任务分配和调度
  - 多助手协调通信
  - 资源优化和负载均衡
  - 状态管理和持久化

- **AI内存系统**：
  - 短期对话记忆
  - 长期向量数据库存储
  - 跨会话上下文保存
  - 知识库集成

- **AI I/O系统**：
  - 多模态输入处理（文本/文件/API）
  - 结构化输出格式
  - 流处理能力
  - 事件驱动架构

### 内置工具
- **计算器**：包含阶乘和质数检查的高级数学运算
- **网络搜索**：集成DuckDuckGo搜索（可自定义结果限制）
- **金融分析**： 
  - 实时股价跟踪
  - 公司信息检索
  - 分析师推荐
  - 金融新闻聚合
- **文件管理**：工作区文件读/写/列表
- **研究工具**：与Exa的集成研究能力

### 专业助手团队
- **Python助手**： 
  - 实时Python代码执行
  - Streamlit图表能力
  - 使用pip的包管理
- **研究助手**： 
  - 生成NYT风格报告
  - 自动化网络研究
  - 结构化输出格式
  - 来源引用和参考管理

### 技术架构
- **FastAPI后端**：带自动文档的RESTful API
- **Streamlit前端**：交互式Web界面
- **向量数据库**：用于高效知识存储检索的PGVector
- **PostgreSQL存储**：对话和助手状态的持久存储
- **Docker支持**：开发和生产环境的容器化部署

### 系统特性
- **知识管理**： 
  - PDF文档处理
  - 网站内容集成
  - 基于向量的语义搜索
  - 知识图谱构建
- **进程控制**： 
  - 任务调度和优先级
  - 资源分配
  - 错误处理和恢复
  - 性能监控
- **安全与访问控制**：
  - API密钥管理
  - 认证和授权
  - 速率限制和配额管理
  - 安全数据存储

## 安全考虑

### 传输安全
- 使用TLS进行远程连接
- 验证连接来源
- 需要时实施认证

### 消息验证
- 验证所有传入消息
- 输入清洗
- 检查消息大小限制
- 验证JSON-RPC格式

### 资源保护
- 实施访问控制
- 验证资源路径
- 监控资源使用
- 限制请求速率

### 错误处理
- 不泄露敏感信息
- 记录安全相关错误
- 实施适当清理
- 处理DoS场景

## 路线图 📍

### 核心平台
- ✅ 基础AI助手框架
- ✅ Streamlit Web界面
- ✅ FastAPI后端
- ✅ 数据库集成（SQLite/PostgreSQL）
- ✅ OpenAI集成
- ✅ Docker容器化
- ✅ 环境配置系统
- 🔄 多模态输入处理（部分）
- 🚧 高级错误处理和恢复
- 🚧 性能监控仪表板
- 📅 分布式任务队列
- 📅 水平扩展支持
- 📅 自定义插件架构

### AI进程管理
- ✅ 基础任务分配
- ✅ 多助手团队结构
- ✅ 状态管理和持久化
- 🔄 动态任务调度（部分）
- 🚧 资源优化
- 🚧 负载均衡
- 📅 进程可视化
- 📅 工作流设计器
- 📅 高级进程分析

### 内存系统
- ✅ 短期对话记忆
- ✅ 基础向量数据库集成
- ✅ 会话上下文保存
- 🔄 知识库集成（部分）
- 🚧 内存优化算法
- 🚧 跨会话学习
- 📅 分层内存架构
- 📅 遗忘机制
- 📅 内存压缩

### 工具与集成
- ✅ 计算器
- ✅ 网络搜索（DuckDuckGo）
- ✅ 金融分析工具
- ✅ 文件管理
- ✅ 研究工具（Exa）
- ✅ PDF文档处理
- ✅ 网站内容集成
- 🔄 Python代码执行（部分）
- 🚧 高级数据可视化
- 🚧 外部API集成框架
- 📅 图像生成和处理
- 📅 音频处理
- 📅 视频分析

### 安全与访问控制
- ✅ 基础API密钥管理
- ✅ 简单认证
- 🔄 授权系统（部分）
- 🚧 速率限制
- 🚧 配额管理
- 📅 基于角色的访问控制
- 📅 审计日志
- 📅 合规报告

### 开放式协议架构
- 🔄 模块接口标准（部分）
- 🚧 第三方工具集成协议
- 🚧 服务发现机制
- 📅 通用连接器框架
- 📅 协议验证系统
- 📅 遗留系统兼容层

### 多代理协作
- ✅ 基础团队结构
- 🔄 代理间通信（部分）
- 🚧 任务分解引擎
- 🚧 冲突解决系统
- 📅 协作规划
- 📅 涌现行为分析
- 📅 代理专业化框架

### 跨平台支持
- ✅ Web界面
- 🔄 API访问（部分）
- 🚧 移动响应
- 📅 桌面应用
- 📅 CLI界面
- 📅 IoT设备集成
- 📅 语音助手集成

### 图例
- ✅ 已完成
- 🔄 部分实现
- 🚧 开发中
- 📅 计划中

## 设置工作区
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

## API Documentation

### REST API Endpoints

#### Assistant API
- `POST /api/v1/assistant/chat`
  - Process chat messages with the AI assistant
  - Supports context-aware conversations
  - Returns structured responses with tool usage information

#### Health Check
- `GET /api/v1/health`
  - Monitor system health status
  - Returns version and status information

### API Documentation
- Interactive API documentation available at `/docs`
- ReDoc alternative documentation at `/redoc`
- OpenAPI specification at `/openapi.json`

## Development Guide

### Project Structure
```
lyraios/
├── ai/                     # AI core functionality
│   ├── assistants.py       # Assistant implementations
│   ├── llm/                # LLM integration
│   └── tools/              # AI tools implementations
├── app/                    # Main application
│   ├── components/         # UI components
│   ├── config/             # Application configuration
│   ├── db/                 # Database models and storage
│   ├── styles/             # UI styling
│   ├── utils/              # Utility functions
│   └── main.py             # Main application entry point
├── assets/                 # Static assets like images
├── data/                   # Data storage
├── tests/                  # Test suite
├── workspace/              # Workspace configuration
│   ├── dev_resources/      # Development resources
│   ├── settings.py         # Workspace settings
│   └── secrets/            # Secret configuration (gitignored)
├── docker/                 # Docker configuration
├── scripts/                # Utility scripts
├── .env                    # Environment variables
├── requirements.txt        # Python dependencies
└── README.md               # Project documentation
```

### Environment Configuration

1. **Environment Variables Setup**
```bash
# Copy the example .env file
cp example.env .env

# Required environment variables
EXA_API_KEY=your_exa_api_key_here        # Get from https://dashboard.exa.ai/api-keys
OPENAI_API_KEY=your_openai_api_key_here  # Get from OpenAI dashboard
OPENAI_BASE_URL=your_openai_base_url     # Optional: Custom OpenAI API endpoint

# OpenAI Model Configuration
OPENAI_CHAT_MODEL=gpt-4-turbo-preview    # Default chat model
OPENAI_VISION_MODEL=gpt-4-vision-preview  # Model for vision tasks
OPENAI_EMBEDDING_MODEL=text-embedding-3-small  # Model for embeddings

# Optional configuration
STREAMLIT_SERVER_PORT=8501  # Default Streamlit port
API_SERVER_PORT=8000       # Default FastAPI port
```

2. **OpenAI Configuration Examples**
```bash
# Standard OpenAI API
OPENAI_API_KEY=sk-***
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_CHAT_MODEL=gpt-4-turbo-preview

# Azure OpenAI
OPENAI_API_KEY=your_azure_api_key
OPENAI_BASE_URL=https://your-resource.openai.azure.com/openai/deployments/your-deployment
OPENAI_CHAT_MODEL=gpt-4

# Other OpenAI API providers
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://your-api-endpoint.com/v1
OPENAI_CHAT_MODEL=your-model-name
```

2. **Streamlit Configuration**
```bash
# Create Streamlit config directory
mkdir -p ~/.streamlit

# Create config.toml to disable usage statistics (optional)
cat > ~/.streamlit/config.toml << EOL
[browser]
gatherUsageStats = false
EOL
```

### Development Scripts

The project includes convenient development scripts to manage the application:

1. **Using dev.py Script**
```bash
# Run both frontend and backend
python -m scripts.dev run

# Run only frontend
python -m scripts.dev run --no-backend

# Run only backend
python -m scripts.dev run --no-frontend

# Run with custom ports
python -m scripts.dev run --frontend-port 8502 --backend-port 8001
```

2. **Manual Service Start**
```bash
# Start Streamlit frontend
streamlit run app/app.py

# Start FastAPI backend
uvicorn api.main:app --reload
```

### Dependencies Management

1. **Core Dependencies**
```bash
# Install production dependencies
pip install -r requirements.txt

# Install development dependencies
pip install -r requirements-dev.txt

# Install the project in editable mode
pip install -e .
```

2. **Additional Tools**
```bash
# Install python-dotenv for environment management
pip install python-dotenv

# Install development tools
pip install black isort mypy pytest
```

### Development Best Practices

1. **Code Style**
- Follow PEP 8 guidelines
- Use type hints
- Write docstrings for functions and classes
- Use black for code formatting
- Use isort for import sorting

2. **Testing**
```bash
# Run tests
pytest

# Run tests with coverage
pytest --cov=app tests/
```

3. **Pre-commit Hooks**
```bash
# Install pre-commit hooks
pre-commit install

# Run manually
pre-commit run --all-files
```

### Deployment Guide

#### Docker Deployment

1. **Development Environment**
```bash
# Build development image
docker build -f docker/Dockerfile.dev -t lyraios:dev .

# Run development container
docker-compose -f docker-compose.dev.yml up
```

2. **Production Environment**
```bash
# Build production image
docker build -f docker/Dockerfile.prod -t lyraios:prod .

# Run production container
docker-compose -f docker-compose.prod.yml up -d
```

#### Configuration Options

1. **Environment Variables**
```
# Application Settings
DEBUG=false
LOG_LEVEL=INFO
ALLOWED_HOSTS=example.com,api.example.com

# AI Settings
AI_MODEL=gpt-4
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=1000

# Database Settings
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
```

2. **Scaling Options**
- Configure worker processes via `GUNICORN_WORKERS`
- Adjust memory limits via `MEMORY_LIMIT`
- Set concurrency via `MAX_CONCURRENT_REQUESTS`

### Monitoring and Maintenance

1. **Health Checks**
- Monitor `/health` endpoint
- Check system metrics via Prometheus endpoints
- Review logs in `/var/log/lyraios/`

2. **Backup and Recovery**
```bash
# Backup database
python scripts/backup_db.py

# Restore from backup
python scripts/restore_db.py --backup-file backup.sql
```

3. **Troubleshooting**
- Check application logs
- Verify environment variables
- Ensure database connectivity
- Monitor system resources

### Database Configuration

The system supports both SQLite and PostgreSQL databases:

1. **SQLite (Default)**
```bash
# SQLite Configuration
DATABASE_TYPE=sqlite
DATABASE_PATH=data/lyraios.db
```

2. **PostgreSQL**
```bash
# PostgreSQL Configuration
DATABASE_TYPE=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=lyraios
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
```

The system will automatically use SQLite if no PostgreSQL configuration is provided.

## Contributing

We welcome contributions! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for details.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
