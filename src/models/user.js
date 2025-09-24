import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // optional: make unique
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Check if the model already exists (prevents overwrite errors)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
