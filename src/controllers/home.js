const { Post } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
    const posts = await Post.find().sort({timestamp: -1}).populate('user').lean();
    actualUser = req.user;
    res.render('index', {posts, actualUser});
    console.log(posts);
};

module.exports = ctrl;