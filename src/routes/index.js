const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const post = require('../controllers/post');

const Post = require('../models/Post');

const { isAuthenticated } = require('../helpers/auth');

module.exports = app => {

    router.get('/', isAuthenticated, home.index);
    router.get('/posts/:post_id', isAuthenticated, post.index);
    router.post('/posts', isAuthenticated, post.create);
    router.post('/posts/:post_id/like', isAuthenticated, post.like);
    router.post('/posts/:post_id/removeLike', isAuthenticated, post.removeLike);
    router.post('/posts/:post_id/comment', isAuthenticated, post.comment);
    router.delete('/posts/:post_id', isAuthenticated, post.remove);
    
    // Posts API
    router.get('/api/posts', isAuthenticated, async (req, res) => {
        const posts = await Post.find().sort({timestamp: -1}).lean();
        res.json(posts);
        console.log(posts);
    });

    app.use(router);

};