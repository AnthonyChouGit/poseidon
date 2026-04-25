const express = require('express');
const router = express.Router();
const path = require('path');

const media_path = process.env.MEDIA_PATH || path.join(__dirname, '../../../media');

router.use('/covers', express.static(path.join(media_path, 'covers'), {
    maxAge: '1d', //缓存1天
    fallthrough: false, //失败直接返回404
    immutable: false, //可变
    index: false, //不索引
    dotfiles: 'ignore' //不显示隐藏文件
}));

module.exports = router;