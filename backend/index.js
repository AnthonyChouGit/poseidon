const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const api_router = require('./routers/api_router');
const media_router = require('./routers/media_router');
const app = express();
const port = process.env.PORT || 5173;

app.use(express.static(path.join(__dirname, '../dist')));

app.use(express.json());
app.use(cookieParser());

app.use('/api', api_router);
app.use('/media', media_router);
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
