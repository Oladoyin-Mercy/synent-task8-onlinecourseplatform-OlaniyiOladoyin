const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, unique: true, lowercase: 'true'},
    role: {type: String, default: 'Student'},
})



module.exports = mongoose.model('user', userSchema);