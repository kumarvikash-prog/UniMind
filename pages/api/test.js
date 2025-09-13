/*
Before you even touch Google login or NextAuth, you want to be 100% sure that:

-> Your app can connect to your MongoDB Atlas cluster
-> Your MONGODB_URI is correct
-> Your lib/mongodb.js helper works
*/

import dbConnect from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    await dbConnect();
    res.status(200).json({ success: true, message: "✅ MongoDB connection successful!" });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ success: false, message: "❌ MongoDB connection failed" });
  }
}
