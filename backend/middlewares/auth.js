const {db} = require('../utils/db');
const { is_valid_username, is_valid_password, is_valid_email } = require('../utils/user_validation');
const jwt = require('jsonwebtoken');
const jwt_secret_key = process.env.JWT_SECRET_KEY || 'nozomu_secret_key';
const jwt_expires_in = process.env.JWT_EXPIRES_IN || 3600000;
const bcrypt = require('bcryptjs');

/**
 * login_handler
 *
 * 登录中间件。读取 `req.body.username` / `req.body.password`，
 * 将结果写入 `req.login_status` 后调用 `next()`，由后续中间件决定响应。
 *
 * `req.login_status` 形如 `{ success, data: { code?, msg?, username?, ... } }`：
 * - 成功：`success: true`，同时在响应 cookie 中下发 `token`（JWT）。
 * - 失败 code：`INVALID_LOGIN_DATA` / `USER_NOT_FOUND` / `WRONG_PASSWORD`。
 *
 * 遇到数据库等未预期异常时，不走 `next()`，直接返回 HTTP 500
 * `{ success: false, data: { code: 'LOGIN_SERVICE_ERROR', msg } }`。
 */
const login_handler = async (req, res, next) => {
    //Retrieve username and password from request body
    const { username, password } = req.body;
    //Check whether username and password comply with the our requirements
    //If they do not comply, there is no need to proceed with the login process, which involves database operations
    const username_valid = is_valid_username(username);
    const password_valid = is_valid_password(password);
    //If either username or password is invalid, set login_status with INVALID_LOGIN_DATA error code
    if (!username_valid || !password_valid) {
        const login_status = {
            success: false,
            data: {
                code: 'INVALID_LOGIN_DATA',
                msg: 'Invalid login data',
                username_valid,
                password_valid
            }
        };
        //Set login_status to request object
        req.login_status = login_status;
        return next();
    }
    //The following code involves database operations, so we wrap it in a try-catch block
    try {
      //Check whether the user exists in the database
      const exist_user = await db.oneOrNone('SELECT username, hashed_password FROM poseidon_users WHERE username = $1', [username]);
      //If the user does not exist, set login_status with USER_NOT_FOUND error code
      if (!exist_user) {
        const login_status = {
            success: false,
            data: {
                code: 'USER_NOT_FOUND',
                msg: 'User not found',
                username: username
            }
        };
        //Set login_status to request object
        req.login_status = login_status;
        return next();
      }
      //Check whether the password is correct
      const is_password_correct = await bcrypt.compare(password, exist_user.hashed_password);
      //If the password is incorrect, set login_status with WRONG_PASSWORD error code
      if (!is_password_correct) {
        const login_status = {
            success: false,
            data: {
                code: 'WRONG_PASSWORD',
                msg: 'Wrong password',
                username: username
            }
        };
        //Set login_status to request object
        req.login_status = login_status;
        return next();
      }
      //Generate JWT token
      const token = jwt.sign({ username: exist_user.username }, jwt_secret_key, { expiresIn: jwt_expires_in });
      //Set JWT token to cookie
      res.cookie('token', token, { httpOnly: true, maxAge: jwt_expires_in });
      //Update last_login time of the user
      //Use fire and forget approach to update last_login time, because we do not need to wait for the update to complete
      db.none('UPDATE poseidon_users SET last_login = $1 WHERE username = $2', [new Date(), exist_user.username])
        .catch((error)=>console.log(`Error updating last_login time of user ${exist_user.username}: ${error}`));
      //Set login_status to success and return the username
      const login_status = {
        success: true,
        data: {
            username: exist_user.username
        }
      };
      //Set login_status to request object
      req.login_status = login_status;
      next();
    } catch (error) {
      //DB operation failed, terminate the request with 500 status code and return the error message
      console.error(error);
      return res.status(500).json({ 
        success: false, 
        data: { 
          code: 'LOGIN_SERVICE_ERROR', 
          msg: error.message 
        } 
      });
    }
}

/**
 * register_handler
 *
 * 注册中间件。读取 `req.body.username` / `req.body.password` / `req.body.email`，
 * 将结果写入 `req.register_status` 后调用 `next()`，由后续中间件决定响应。
 *
 * `req.register_status` 形如 `{ success, data: { code?, msg?, username?, ... } }`：
 * - 成功：`success: true`；不会自动登录，需要客户端再走登录流程。
 * - 失败 code：`INVALID_REGISTER_DATA` / `USER_ALREADY_EXISTS`。
 *
 * 遇到数据库等未预期异常时，不走 `next()`，直接返回 HTTP 500
 * `{ success: false, data: { code: 'REGISTER_SERVICE_ERROR', msg } }`。
 */
const register_handler = async (req, res, next) => {
    //Retrieve username, password and email from request body
    const { username, password, email } = req.body;
    //Check whether username, password and email comply with the our requirements
    const username_valid = is_valid_username(username);
    const password_valid = is_valid_password(password);
    const email_valid = is_valid_email(email);
    //If either username, password or email is invalid, set register_status with INVALID_REGISTER_DATA error code
    if (!username_valid || !password_valid || !email_valid) {
      const register_status = {
        success: false,
        data: {
            code: 'INVALID_REGISTER_DATA',
            msg: 'Invalid register data',
            username_valid,
            password_valid,
            email_valid
        }
      };
      //Set register_status to request object
      req.register_status = register_status;
      return next();
    }
    //The following code involves database operations, so we wrap it in a try-catch block
    try {
      //Check whether the username already exists in the database
      const exist_username = await db.oneOrNone('SELECT username FROM poseidon_users WHERE username = $1', [username]);
      //If the username already exists, set register_status with USER_ALREADY_EXISTS error code
      if (exist_username) {
        const register_status = {
            success: false,
            data: {
                code: 'USER_ALREADY_EXISTS',
                msg: 'User already exists',
                exist_username: exist_username.username
            }
        };
        //Set register_status to request object
        req.register_status = register_status;
        return next();
      }
      //Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      //Insert the user into the database
      await db.none('INSERT INTO poseidon_users (username, hashed_password, email, create_at) VALUES ($1, $2, $3, $4)', [username, hashedPassword, email, new Date()]);
      //Set register_status to success and return the username
      const register_status = {
        success: true,
        data: {
            username: username
        }
      };
      //Set register_status to request object
      req.register_status = register_status;
      next();
    } catch (error) {
      //DB operation failed, terminate the request with 500 status code and return the error message
      console.error(error);
      return res.status(500).json({ 
        success: false, 
        data: { 
          code: 'REGISTER_SERVICE_ERROR', 
          msg: error.message 
        } 
      });
    }
}

/**
 * verify_handler
 *
 * 鉴权中间件。读取 `req.cookies.token`，校验 JWT 后把结果写入
 * `req.verify_status` 并调用 `next()`，由后续中间件或路由决定如何处理
 * （例如未登录时返回 401 或按游客处理）。本中间件不会直接结束响应。
 *
 * `req.verify_status` 形如 `{ success, data: { code?, msg?, username? } }`：
 * - 成功：`success: true`，`data.username` 为 JWT 中解出的用户名。
 * - 失败 code：`NO_TOKEN`（未携带 token）/ `INVALID_TOKEN`（签名错或已过期）。
 */
const verify_handler = async (req, res, next) => {
  //Retrieve token from cookies
  const token = req.cookies.token;
  //If no token is provided, set verify_status with NO_TOKEN error code
  if (!token) {
    const verify_status = {
      success: false,
      data: {
        code: 'NO_TOKEN',
        msg: 'No token provided'
      }
    };
    req.verify_status = verify_status;
    return next();
  }
  //The following code involves JWT verification, which throws an error if the token is invalid, so we wrap it in a try-catch block
  try {
    const decoded = jwt.verify(token, jwt_secret_key);
    //If the token is valid, set verify_status to success and return the username
    const verify_status = {
      success: true,
      data: {
        username: decoded.username
      }
    };
    req.verify_status = verify_status;
    next();
  } catch (error) {
    //JWT verification failed, set verify_status with INVALID_TOKEN error code
    const verify_status = {
      success: false,
      data: {
        code: 'INVALID_TOKEN',
        msg: 'Invalid token'
      }
    };
    req.verify_status = verify_status;
    next();
  }
}

module.exports = { login_handler, register_handler, verify_handler };