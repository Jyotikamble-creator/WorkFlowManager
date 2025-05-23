const mongoose = require("mongoose");

const auth=require("../middleware/auth")
const Task=require("../models/Task")
const router = require("express").Router();

router.get('/',auth,async(req,res)=>{
    const tasks=await Task.find().populate('assignedTo','createdBy','username')
    return json(tasks)
})

router.get('/',auth,async(req,res)=>{
    const tasks=await Task.findbyId(req.params.id).populate('assignedTo','createdBy','username')
    return json(tasks)
})


router.post('/',auth,async(req,res)=>{
    const task=new Task(req.body)
    await task.save()
    return json(task)
})

module.exports=router;