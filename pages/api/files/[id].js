import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb";
import File from "../../../models/File";
import Message from "../../../models/Message";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const file = await File.findById(id)
        .populate('uploadedBy', 'name email image');

      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      res.status(200).json(file);
    } catch (error) {
      console.error("Error fetching file:", error);
      res.status(500).json({ error: "Failed to fetch file" });
    }
  } else if (req.method === "PUT") {
    try {
      const { description, tags } = req.body;
      
      const file = await File.findByIdAndUpdate(
        id,
        { description, tags },
        { new: true }
      ).populate('uploadedBy', 'name email image');

      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      res.status(200).json(file);
    } catch (error) {
      console.error("Error updating file:", error);
      res.status(500).json({ error: "Failed to update file" });
    }
  } else if (req.method === "DELETE") {
    try {
      const file = await File.findByIdAndDelete(id);
      
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      // Delete associated messages
      await Message.deleteMany({ fileId: id });

      res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).json({ error: "Failed to delete file" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
