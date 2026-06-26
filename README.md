# Project Poseidon
由ノゾム君全栈开发的个人项目。

## 后端配置

后端服务现在使用 YAML 配置文件进行配置。默认情况下，应用会在运行目录下寻找 `config.yaml` 文件。你可以通过设置环境变量 `CONFIG_PATH` 来指定自定义配置文件的路径。

**生产部署必须显式覆盖默认值**，否则会留下严重的安全隐患（尤其是数据库密码和 JWT 密钥）。

### 配置文件结构 (`config.yaml`)

以下是完整的配置结构及其默认值（未配置的字段将自动回退到默认值）：

```yaml
database:
  host: "172.17.0.1"        # PostgreSQL 主机
  port: 5432                # PostgreSQL 端口
  username: "public_db_root" # 数据库用户
  password: "public_db_root" # 数据库密码（生产务必修改！）
  name: "public_db"         # 数据库名

auth:
  jwt_secret_key: "nozomu_secret_key" # JWT 签名密钥（生产务必替换为强随机串！）
  jwt_expires_in: 3600000             # JWT 有效期（毫秒，默认 1 小时）

server:
  host: "0.0.0.0" # 监听地址
  port: 5173      # 服务监听端口
```

### 启动示例

1. 创建一个生产环境专用的 `config.yaml`：
```yaml
database:
  host: "db.internal"
  username: "poseidon"
  password: "YOUR_STRONG_PASSWORD"
  name: "poseidon"

auth:
  jwt_secret_key: "YOUR_STRONG_RANDOM_SECRET"

server:
  port: 8080
```

2. 指定配置文件路径并启动服务：
```bash
CONFIG_PATH=/path/to/your/config.yaml node dist/main
```

---

### 使用 `.env` 文件配置

除了 YAML 之外，也支持使用 `.env` 文件进行配置。只需将 `CONFIG_PATH` 指向一个 `.env` 文件即可（文件名必须以 `.env` 结尾）。

#### `.env` 变量对照表

| 环境变量 | 对应 YAML 字段 | 默认值 |
|---|---|---|
| `DATABASE_HOST` | `database.host` | `172.17.0.1` |
| `DATABASE_PORT` | `database.port` | `5432` |
| `DATABASE_USER` | `database.username` | `public_db_root` |
| `DATABASE_PASSWORD` | `database.password` | `public_db_root` |
| `DATABASE_NAME` | `database.name` | `public_db` |
| `JWT_SECRET_KEY` | `auth.jwt_secret_key` | `nozomu_secret_key` |
| `JWT_EXPIRES_IN` | `auth.jwt_expires_in` | `3600000` |
| `SERVER_PORT` | `server.port` | `5173` |
| `SERVER_HOST` | `server.host` | `0.0.0.0` |

> **注意：** 未在 `.env` 中设置的变量将自动回退到默认值。与 YAML 一样，**生产环境必须显式设置数据库密码和 JWT 密钥**。

#### `.env` 示例

```env
DATABASE_HOST="db.internal"
DATABASE_PORT=5432
DATABASE_USER="poseidon"
DATABASE_PASSWORD="YOUR_STRONG_PASSWORD"
DATABASE_NAME="poseidon"

JWT_SECRET_KEY="YOUR_STRONG_RANDOM_SECRET"
JWT_EXPIRES_IN=3600000

SERVER_PORT=8080
SERVER_HOST="0.0.0.0"
```

#### 启动示例

```bash
CONFIG_PATH=/path/to/your/config.env node dist/main
```
