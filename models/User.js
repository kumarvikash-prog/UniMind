// Create User model

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  googleId: { type: String, unique: true }, // Store Google ID here
  // Do NOT set _id to Google ID
});

// Prevent recompilation in dev mode
export default mongoose.models.User || mongoose.model("User", UserSchema);
