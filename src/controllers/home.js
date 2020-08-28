const { Post } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
    const posts = await Post.find({user: req.user._id}).sort({timestamp: -1}).lean();
    res.render('index', {posts});
};

module.exports = ctrl;