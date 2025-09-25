import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb";
import Message from "../../../models/Message";
import User from "../../../models/User";
import Contribution from "../../../models/Contribution";
import File from "../../../models/File";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  if (req.method === "GET") {
    try {
      const { fileId, taskId, room = 'general' } = req.query;
      
      let query = {};
      
      if (fileId) {
        query.fileId = fileId;
        query.type = 'file';
      } else if (taskId) {
        query.taskId = taskId;
        query.type = 'task';
      } else {
        query.room = room;
        query.type = 'general';
      }

      const messages = await Message.find(query)
        .populate('author', 'name email image')
        .sort({ createdAt: 1 })
        .limit(100);

      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  } else if (req.method === "POST") {
    try {
      const { content, fileId, taskId, room = 'general' } = req.body;
      
      // Get current user
      const currentUser = await User.findOne({ email: session.user.email });
      if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
      }

      let messageData = {
        content,
        author: currentUser._id,
        room
      };

      if (fileId) {
        messageData.fileId = fileId;
        messageData.type = 'file';
      } else if (taskId) {
        messageData.taskId = taskId;
        messageData.type = 'task';
      } else {
        messageData.type = 'general';
      }

      const message = new Message(messageData);
      await message.save();

      // Create contribution record with context-aware title
      let fileName = null;
      if (fileId) {
        try {
          const f = await File.findById(fileId).select('name');
          fileName = f?.name || null;
        } catch (e) {
          // ignore lookup errors; fallback title will be used
        }
      }

      const contextTitle = fileId
        ? `Sent message in File${fileName ? `: ${fileName}` : ''}`
        : taskId
          ? 'Sent message in Task'
          : 'Sent message in General';

      const contribution = new Contribution({
        user: currentUser._id,
        type: 'message',
        title: contextTitle,
        description: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
        messageId: message._id,
        fileId: fileId || null,
        taskId: taskId || null,
        metadata: {
          messageCount: 1
        }
      });

      await contribution.save();

      // Populate the message
      await message.populate('author', 'name email image');

      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Failed to create message" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
