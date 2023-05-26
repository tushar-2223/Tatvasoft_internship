const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require:true
    },
    lastname: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    roles : {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    },
    cpassword: {
        type: String,
        require:true
    },
    date: {
        type: Date,
        default:Date.now
    },
})

//collection creation
const User = mongoose.model('USER', userSchema);

module.exports = User;