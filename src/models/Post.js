const mongoose = require('mongoose');
const {Schema} = mongoose;
const path = require('path');

const PostSchema = new Schema({
    description: {type: String, required: true},
    filename: {type: String},
    likes: {type: Number, default: 0},
    views: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
    user: {type: String, required: true}
});

PostSchema.virtual('uniqueId').get(function(){
    return this.filename.replace(path.extname(this.filename), '')
});

module.exports = mongoose.model('Post', PostSchema);