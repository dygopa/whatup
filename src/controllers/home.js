const { Post } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
    const posts = await Post.find().sort({timestamp: -1}).lean();
    res.render('index', {posts});
};

module.exports = ctrl;