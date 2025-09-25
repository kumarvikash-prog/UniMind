import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb";
import Contribution from "../../../models/Contribution";
import User from "../../../models/User";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  if (req.method === "GET") {
    try {
      const { user, type, limit = 50 } = req.query;
      
      let query = {};
      
      if (user && user !== 'all') {
        const userObj = await User.findOne({ 
          name: { $regex: user, $options: 'i' } 
        });
        if (userObj) {
          query.user = userObj._id;
        }
      }
      
      if (type && type !== 'all') {
        query.type = type;
      }

      const contributions = await Contribution.find(query)
        .populate('user', 'name email image')
        .populate('fileId', 'name type size')
        .populate('taskId', 'title status')
        .populate('messageId', 'content')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));

      res.status(200).json(contributions);
    } catch (error) {
      console.error("Error fetching contributions:", error);
      res.status(500).json({ error: "Failed to fetch contributions" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
