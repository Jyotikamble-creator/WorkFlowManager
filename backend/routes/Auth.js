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
    }
    
    })
module.exports=router