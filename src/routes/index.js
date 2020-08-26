const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const post = require('../controllers/post');

const Post = require('../models/Post');

module.exports = app => {

    router.get('/', home.index);
    router.get('/posts/:post_id', post.index);
    router.post('/posts', post.create);
    router.post('/posts/:post_id/like', post.like);
    router.post('/posts/:post_id/comment', post.comment);
    router.delete('/posts/:post_id', post.remove);
    
    // Posts API
    router.get('/api/posts', async (req, res) => {
        const posts = await Post.find().sort({timestamp: -1}).lean();
        res.json(posts);
        console.log(posts);
    });

    app.use(router);

};