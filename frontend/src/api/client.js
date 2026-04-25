import axios from 'axios';

/**
 * 共享 axios 实例。
 * - 生产：前后端同源（Express 通过 `express.static` 一起发 dist 和 /api），
 *   `baseURL: '/'` 让请求自然落到当前站点；切换部署域名也无需重新打包。
 * - 开发：`npm run dev` 时浏览器请求 `/api/*` 会被 Vite dev server
 *   通过 `vite.config.js` 里的 `server.proxy` 转发到本地后端。
 *
 * `withCredentials: true` 让浏览器在请求里带上后端下发的 JWT cookie。
 */
const api = axios.create({
    baseURL: '/',
    timeout: 5000,
    withCredentials: true,
});

export default api;
