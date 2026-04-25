# Project Poseidon
由ノゾム君全栈开发的个人项目。

## 部署环境变量

后端启动时通过 `process.env` 读取，未设置则回退到代码里的默认值。**生产部署必须显式覆盖以下几项**，否则会留下安全隐患或路径错误。

### 必须设置（默认值不安全或不通用）

| 变量 | 用途 | 默认值（仅供开发） |
|---|---|---|
| `JWT_SECRET_KEY` | JWT 签名密钥；泄露=任意伪造登录 | `nozomu_secret_key` |
| `DB_HOST` | PostgreSQL 主机 | `172.17.0.1` |
| `DB_DATABASE` | 数据库名 | `public_db` |
| `DB_USER` | 数据库用户 | `public_db_root` |
| `DB_PASSWORD` | 数据库密码 | （仓库里有默认值，**生产务必改掉**） |

### 按需设置（默认值通常可用）

| 变量 | 用途 | 默认值 |
|---|---|---|
| `PORT` | Express 监听端口 | `5173` |
| `DB_PORT` | PostgreSQL 端口 | `5432` |
| `JWT_EXPIRES_IN` | JWT 有效期（毫秒） | `3600000`（1 小时） |
| `MEDIA_PATH` | 媒体文件根目录的绝对路径；不设置则相对 backend 目录用 `../../media` | 相对路径 |

### 启动示例

```bash
JWT_SECRET_KEY='请用强随机串替换' \
DB_HOST=db.internal \
DB_DATABASE=poseidon \
DB_USER=poseidon \
DB_PASSWORD='请替换' \
MEDIA_PATH=/var/lib/poseidon/media \
PORT=8080 \
node backend/index.js
```
