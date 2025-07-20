// authentication for users
// this is mongoose schema for user 
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
   role:{
    type:String,
    enum:["admin",
        "manager",
        "employee"
    ],required:true,
    default: "employee"
   }
});

module.exports = mongoose.model.User || mongoose.model("User", userSchema);