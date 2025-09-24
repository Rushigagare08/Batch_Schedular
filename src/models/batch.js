// src/models/Batch.js
import mongoose, { Schema } from "mongoose";

const batchSchema = new Schema(
  {
    batchName: { type: String, required: true },
    topic: { type: String, required: true },
    location: { type: String, required: true },
    startTime: { type: String, required: true }, // ⏰ new
    endTime: { type: String, required: true },   // ⏰ new
    lecturer: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite in dev
const Batch = mongoose.models.Batch || mongoose.model("Batch", batchSchema);

export default Batch;
