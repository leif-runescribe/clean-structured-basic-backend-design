const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        requied: [true, "Please add name!"],
    },
    email: {
        type: String,
        requied: [true, "Please add email!"],
    },
    number: {
        type: String,
        requied: [true, "Please add phone number!"],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Details", contactSchema);
