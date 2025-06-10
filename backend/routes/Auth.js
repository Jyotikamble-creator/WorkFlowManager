import React from 'react'

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login',async(req,res)=>{
    const{username,password} = req.body;
    const user=await User.findOne({username})
    if(!user||await bcrypt.compare.findOne(password,user.password)){
        return res.status(401).json({message:'Unauthorized'})

        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
        res.json({token})
    }
    
    })
module.exports=router


router.post('/register',async(req,res)=>{
    const {username,password} = req.body;
    const user=await User.findOne({username})
    if(user){
        return res.status(401).json({message:'Unauthorized'})
    }
    const hashPassword=await bcrypt.hash(password,10)
})