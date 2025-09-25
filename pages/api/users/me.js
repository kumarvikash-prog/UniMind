import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  if (req.method === "GET") {
    try {
      const user = await User.findOne({ email: session.user.email }).select(
        "name email image"
      );
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      return res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { name } = req.body || {};
      if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ error: "Valid name is required" });
      }

      const updated = await User.findOneAndUpdate(
        { email: session.user.email },
        { name: name.trim() },
        { new: true, runValidators: true, projection: "name email image" }
      );

      if (!updated) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(updated);
    } catch (error) {
      console.error("Error updating user name:", error);
      return res.status(500).json({ error: "Failed to update user" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}


