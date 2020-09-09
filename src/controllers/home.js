const { Post, User } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
    const posts = await Post.find({user: req.user._id}).sort({timestamp: -1}).lean();
    // const user = await User.findOne({id: req.user.id}).lean();
    res.render('index', {posts});
};

module.exports = ctrl;