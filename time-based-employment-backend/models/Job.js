import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

title:String,
location:String,
duration:String,
wage:Number,
description:String,

postedBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

},{timestamps:true});

export default mongoose.model("Job",jobSchema);