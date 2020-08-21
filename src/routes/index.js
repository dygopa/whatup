const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const post = require('../controllers/post');

module.exports = app => {

    router.get('/', home.index);
    router.get('/posts/:post_id', post.index);
    router.post('/posts', post.create);
    router.post('/posts/:post_id/like', post.like);
    router.post('/posts/:post_id/comment', post.comment);
    router.delete('/posts/:post_id', post.remove);

    app.use(router);

};