import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  },

  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    default: "Applied"
  }

}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);