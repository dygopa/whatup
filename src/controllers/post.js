const ctrl = {};
const path = require('path');
const {randomNumber} = require('../helpers/libs');
const fs = require('fs-extra');

const {Post} = require('../models');

ctrl.index = (req, res) => {

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
                console.log(imgUrl);
                const imageTempPath = req.file.path;
                const ext = path.extname(req.file.originalname).toLowerCase();
                const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)
                if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                    await fs.rename(imageTempPath, targetPath);
                    const newPost = new Post({
                        description: req.body.description,
                        filename: imgUrl + ext,
                    });
                    const postSaved = await newPost.save();
                    console.log(newPost);
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
        const postSaved = await newPost.save();
        console.log(newPost);
    }

    res.send('Success');

};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};

module.exports = ctrl;