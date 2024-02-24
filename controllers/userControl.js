const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = asyncHandler(async (req,res) => {

    const { name, email, pass} =req.body;
    if(!name || !email || !pass){
        res.send(400);
        throw new Error("Kindly fill all fields!");
    }
    const availableUser = await User.findOne({email});
    if(availableUser){
        res.status(400);
        throw new Error("Already registered!");
    }
//Hashing the password
const hashed = await bcrypt.hash(pass, 10);
console.log("Your hashed password is : ", hashed);
const user = await User.create({
name,
email,
pass: hashed,  
});
console.log(`User created ${user}`);
if(user){
    res.status(201).json({id: user.id, email: user.email});

}
else{
    res.status(400);
    throw new Error("User data not valid!");
}
res.json({message: "Register the user!"});

}); 

const loginUser = asyncHandler(async (req,res) => {
    const {email, pass} = req.body;
    if(!email || !pass){
        res.status(400);
        throw new Error("Must fill all fields");
    }
    const user = await User.findOne({email});
    //compare passwords with hashed
    if(user &&(await bcrypt.compare(pass,user.pass))){
        const accessToken = jwt.sign({
            user:{
                name: user.name,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"}
        )

        res.status(200).json({accessToken});
    }
    else{
        res.status(401)
        throw new Error("email or passwords is not valid");
    }

}); 

const currentUser = asyncHandler(async (req,res) => {
    res.json({message: "Current user info"});

});


module.exports = {registerUser,loginUser, currentUser};