// Create User model

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
});

// Prevent recompilation in dev mode
export default mongoose.models.User || mongoose.model("User", UserSchema);
