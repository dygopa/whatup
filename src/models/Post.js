const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const path = require('path');

const PostSchema = new Schema({
    description: {type: String, required: true},
    filename: {type: String},
    likes: {type: Number, default: 0},
    views: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
    user: {type: String}
});

PostSchema.virtual('uniqueId').get(function(){
    return this.fileName.replace(path.extname(this.fileName), '')
});

module.exports = model('Post', PostSchema);