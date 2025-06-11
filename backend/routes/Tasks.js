const mongoose = require("mongoose");

const auth=require("../middleware/auth")
const Task=require("../models/Task");
const { create } = require("domain");
const router = require("express").Router();


// Get/read all tasks by id
router.get('/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id)
  .populate('assignedTo ', 'email')
  .populate('createdBy', 'email');
  res.json(task);
});

// get single task
router.get('/', auth, async (req, res) => {
    const tasks=await Task.find()
    .populate('assignedTo ', 'email')
    .populate('createdBy', 'email');
    res.json(tasks);
})



// create a new task
router.post('/',auth,async(req,res)=>{
    const task=new Task({...req.body,createdBy:req.user._id})
    await task.save()
    
    res.status(201).json(task)
})

// Update a task
router.put('/:id',auth,async(req,res)=>{
    const task=await Task.findByIdAndUpdate(req.params.id,req.body,{ new:true});
    res.json(task)
})

router.delete('/:id',auth,async(req,res)=>{
    const task=await Task.findByIdAndDelete(req.params.id);
    res.json(task)
})

router.post('/:id/comment', auth, async (req, res) => {
const task = await Task.findById(req.params.id);
task.comments.push({ author: req.user._id, text: req.body.text });
await task.save();
res.json(task);
});

module.exports=router;



