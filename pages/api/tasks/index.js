import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb";
import Task from "../../../models/Task";
import User from "../../../models/User";
import Contribution from "../../../models/Contribution";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  if (req.method === "GET") {
    try {
      const { status, assignee, sortBy = 'date' } = req.query;
      
      let query = {};
      
      if (status && status !== 'all') {
        query.status = status;
      }
      
      if (assignee && assignee !== 'all') {
        const user = await User.findOne({ name: { $regex: assignee, $options: 'i' } });
        if (user) {
          query.assignee = user._id;
        }
      }

      let sort = {};
      switch (sortBy) {
        case 'title':
          sort = { title: 1 };
          break;
        case 'dueDate':
          sort = { dueDate: 1 };
          break;
        case 'priority':
          sort = { priority: -1 };
          break;
        case 'date':
        default:
          sort = { createdAt: -1 };
          break;
      }

      const tasks = await Task.find(query)
        .populate('assignee', 'name email image')
        .populate('createdBy', 'name email image')
        .sort(sort)
        .limit(50);

      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, description, assignee, dueDate, priority, tags } = req.body;
      
      // Get current user
      const currentUser = await User.findOne({ email: session.user.email });
      if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // Find assignee user
      const assigneeUser = await User.findOne({ 
        $or: [
          { name: { $regex: assignee, $options: 'i' } },
          { email: assignee }
        ]
      });
      
      if (!assigneeUser) {
        return res.status(404).json({ error: "Assignee not found" });
      }

      const task = new Task({
        title,
        description,
        assignee: assigneeUser._id,
        createdBy: currentUser._id,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : []
      });

      await task.save();

      // Create contribution record
      const contribution = new Contribution({
        user: currentUser._id,
        type: 'task',
        title: `Created task: ${title}`,
        description: `Assigned to ${assigneeUser.name}`,
        taskId: task._id,
        metadata: {
          taskStatus: 'todo'
        }
      });

      await contribution.save();

      // Populate the task
      await task.populate('assignee', 'name email image');
      await task.populate('createdBy', 'name email image');

      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Failed to create task" });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
