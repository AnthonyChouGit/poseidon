const {db} = require('../utils/db');

/**
 * fetch_all_apps_handler
 *
 * 获取应用列表中间件。无输入参数，把结果写入 `req.apps_status`
 * 后调用 `next()`，由后续中间件决定响应。
 *
 * `req.apps_status` 形如 `{ success, data: { apps?, code?, msg? } }`：
 * - 成功：`success: true`，`data.apps` 为应用数组。
 *
 * 遇到数据库等未预期异常时，不走 `next()`，直接返回 HTTP 500
 * `{ success: false, data: { code: 'APPS_SERVICE_ERROR', msg } }`。
 */
const fetch_all_apps_handler = async (req, res, next) => {
    try {
        const apps = await db.any('SELECT appid, title, summary, url, about_url, tags, create_at FROM poseidon_apps ORDER BY appid');
        if (!apps) {
            req.apps_status = {
                success: false,
                data: {
                    code: 'NO_APPS_FOUND',
                    msg: 'No apps found'
                }
            };
            return next();
        }
        req.apps_status = {
            success: true,
            data: {
                apps
            }
        };
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            data: {
                code: 'APPS_SERVICE_ERROR',
                msg: error.message
            }
        });
    }
}

/**
 * fetch_app_by_id_handler
 *
 * 获取单个应用中间件。读取 `req.body.app_id`，把结果写入
 * `req.app_status` 后调用 `next()`，由后续中间件决定响应。
 *
 * `req.app_status` 形如 `{ success, data: { app?, code?, msg?, app_id? } }`：
 * - 成功：`success: true`，`data.app` 为应用对象。
 * - 失败 code：`APP_NOT_FOUND`。
 *
 * 遇到数据库等未预期异常时，不走 `next()`，直接返回 HTTP 500
 * `{ success: false, data: { code: 'APP_SERVICE_ERROR', msg } }`。
 */
const fetch_app_by_id_handler = async (req, res, next) => {
    const { appid } = req.body;
    try {
        const app = await db.oneOrNone('SELECT appid, title, summary, url, about_url, tags, create_at FROM poseidon_apps WHERE appid = $1', [appid]);
        if (!app) {
            req.app_status = {
                success: false,
                data: {
                    code: 'APP_NOT_FOUND',
                    msg: 'App not found',
                    appid
                }
            };
            return next();
        }
        req.app_status = {
            success: true,
            data: {
                app
            }
        };
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            data: {
                code: 'APP_SERVICE_ERROR',
                msg: error.message
            }
        });
    }
}

module.exports = { fetch_all_apps_handler, fetch_app_by_id_handler };
