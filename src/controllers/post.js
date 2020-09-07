const ctrl = {};
const path = require('path');
const {randomNumber} = require('../helpers/libs');
const fs = require('fs-extra');
const cloudinary = require('cloudinary').v2;

const {Post} = require('../models');

ctrl.index = async (req, res) => {
    const post = await Post.findOne({public_id: req.params.public_id}).lean();
    console.log(post);
    res.render('posts/post');
};

ctrl.create = async (req, res) => {
    if(req.file){
        const saveImage = async () =>{
            
            const imgUrl = randomNumber();
            const images = await Post.find({
                filename: imgUrl
            });

            if(images.length > 0){
                saveImage();
            }else{
                const imageTempPath = req.file.path;
                const ext = path.extname(req.file.originalname).toLowerCase();
                if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){

                    try {
                        const result = await cloudinary.uploader.upload(req.file.path);
                        const newPost = new Post({
                            description: req.body.description,
                            filename: imgUrl + ext,
                            imgUrl: result.secure_url,
                            public_id: result.public_id
                        });
                        newPost.user = req.user._id;
                        
                        await newPost.save();
                        await fs.unlink(imageTempPath);
                        
                        console.log(newPost);
                        
                        req.flash('success_msg', 'Post publicado con exito');
                        res.redirect('/');
                    } catch (e) {
                        console.log(e);
                    }

                }else{
                    await fs.unlink(imageTempPath);
                    res.status(500).json({
                        error: 'Only images allowed'
                    });
                }
            }
        };
        
        saveImage();
    }else{
        const newPost = new Post({
            description: req.body.description
        });

        newPost.user = req.user._id;
        await newPost.save();

        console.log(newPost);
        req.flash('success_msg', 'Post publicado con exito');
        res.redirect('/');
    }
};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};

module.exports = ctrl;