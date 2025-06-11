const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:String,
    description:String,
    assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    status:{type:String,enum:["pending","inprogress","completed"],default:"pending"}
},{timpStamps:true})



module.exports=mongoose.model("Task",taskSchema)

