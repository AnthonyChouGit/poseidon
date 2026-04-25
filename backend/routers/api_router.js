const express = require('express');
const router = express.Router();
const { login_handler, register_handler, verify_handler } = require('../middlewares/auth');
const { fetch_all_apps_handler, fetch_app_by_id_handler } = require('../middlewares/app_info');

router.get('/verify', verify_handler, (req, res)=>{
  const verify_status = req.verify_status;
  if (verify_status.success) {
    return res.status(200).json(verify_status);
  } else {
    return res.status(400).json(verify_status);
  }
});

router.post('/register', register_handler, (req, res)=>{
  const register_status = req.register_status;
  if (register_status.success) {
    return res.status(201).json(register_status);
  } else {
    return res.status(400).json(register_status);
  }
});

router.post('/login', login_handler, (req, res)=>{
  const login_status = req.login_status;
  if (login_status.success) {
    return res.status(200).json(login_status);
  } else {
    return res.status(400).json(login_status);
  }
});

router.get('/apps', fetch_all_apps_handler, (req, res)=>{
  const apps_status = req.apps_status;
  if (apps_status.success) {
    return res.status(200).json(apps_status);
  } else {
    return res.status(400).json(apps_status);
  }
});

router.post('/app', fetch_app_by_id_handler, (req, res)=>{
  const app_status = req.app_status;
  if (app_status.success) {
    return res.status(200).json(app_status);
  } else {
    return res.status(app_status.data.code === 'APP_NOT_FOUND' ? 404 : 400).json(app_status);
  }
});

module.exports = router;
