 const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactmodel");


const getContacts = asyncHandler(async (req,res) => {
    const contacts = await(Contact.find());
    res.status(200).json({contacts});
});

const createContact = asyncHandler(async (req,res) => {
    console.log(req.body);
    const{name,email,number} = req.body;
    if(!name || !number || !email){
        res.status(400);
        throw new Error("Fill all fields!");
    }
    const contact = await Contact.create({
        name,
        email,
        number,
    });
    res.status(201).json(contact);
});

const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.send(404);
        throw new Error("Could not find this contact!");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.send(404);
        throw new Error("Could not find this contact!");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.send(404);
        throw new Error("Could not find this contact!");
    }
    await contact.remove();
    res.status(200).json(contact);
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
