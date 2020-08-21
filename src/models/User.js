const moongose = require('mongoose');
const {Schema, model} = moongose;

const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    name: {type: String, required: True},
    email: {type: String, required: True},
    password: {type: String, required: True},
    picProfile: {type: String, required: True},
    coverProfile: {type: String, required: True},
    date: {type: date, date: Date.now}
});

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

model.exports = model('User', UserSchema);