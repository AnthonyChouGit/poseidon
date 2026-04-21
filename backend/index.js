const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { login_handler, register_handler, verify_handler } = require('./utils/auth');
const { fetch_all_apps_handler, fetch_app_by_id_handler } = require('./utils/app_info');
const app = express();
const port = process.env.PORT || 5173;

app.use(express.static(path.join(__dirname, '../dist')));

app.use(express.json());
app.use(cookieParser());

app.get('/api/verify', verify_handler, (req, res)=>{
  const verify_status = req.verify_status;
  if (verify_status.success) {
    return res.status(200).json(verify_status);
  } else {
    return res.status(400).json(verify_status);
  }
});

app.post('/api/register', register_handler, (req, res)=>{
  const register_status = req.register_status;
  if (register_status.success) {
    return res.status(201).json(register_status);
  } else {
    return res.status(400).json(register_status);
  }
});

app.post('/api/login', login_handler, (req, res)=>{
  const login_status = req.login_status;
  if (login_status.success) {
    return res.status(200).json(login_status);
  } else {
    return res.status(400).json(login_status);
  }
});

app.get('/api/apps', fetch_all_apps_handler, (req, res)=>{
  const apps_status = req.apps_status;
  if (apps_status.success) {
    return res.status(200).json(apps_status);
  } else {
    return res.status(400).json(apps_status);
  }
});

app.post('/api/app', fetch_app_by_id_handler, (req, res)=>{
  const app_status = req.app_status;
  if (app_status.success) {
    return res.status(200).json(app_status);
  } else {
    return res.status(app_status.data.code === 'APP_NOT_FOUND' ? 404 : 400).json(app_status);
  }
});

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});