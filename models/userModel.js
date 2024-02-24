const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add username"],

    },
    email:{
        type: String,
        required: [true, "Please add your email"],
        unique: [true, "Email already taken!"],
        
    },
    pass: {
        type: String,
        required: [true, "Please add your password"],
    },
},{
    timestamps: true,
});
module.exports = mongoose.model("User", userSchema);