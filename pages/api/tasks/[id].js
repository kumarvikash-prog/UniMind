import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb";
import Task from "../../../models/Task";
import Contribution from "../../../models/Contribution";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const task = await Task.findById(id)
        .populate('assignee', 'name email image')
        .populate('createdBy', 'name email image')
        .populate('comments.author', 'name email image');

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json(task);
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ error: "Failed to fetch task" });
    }
  } else if (req.method === "PUT") {
    try {
      const { title, description, status, priority, dueDate, tags } = req.body;
      
      const task = await Task.findByIdAndUpdate(
        id,
        { title, description, status, priority, dueDate, tags },
        { new: true }
      )
        .populate('assignee', 'name email image')
        .populate('createdBy', 'name email image');

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Create contribution record for status change
      if (status) {
        const currentUser = await User.findOne({ email: session.user.email });
        const contribution = new Contribution({
          user: currentUser._id,
          type: 'task',
          title: `Updated task: ${task.title}`,
          description: `Status changed to ${status}`,
          taskId: task._id,
          metadata: {
            taskStatus: status
          }
        });
        await contribution.save();
      }

      res.status(200).json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Failed to update task" });
    }
  } else if (req.method === "DELETE") {
    try {
      const task = await Task.findByIdAndDelete(id);
      
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
