const mongoose=require("mongoose");

const express=require("express");
const router=express.Router();
const User=require("../models/User")
const auth=require("../middleware/auth")

router.get('/',auth,async(req,res)=>{
    const {role}=req.user
    const query=role?{role}:{};
    const users=await User.find(query).select("-password")
    res. json(users)
})

module.exports=router