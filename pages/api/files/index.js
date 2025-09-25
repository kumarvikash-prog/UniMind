import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb";
import File from "../../../models/File";
import User from "../../../models/User";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  if (req.method === "GET") {
    try {
      const { category, search, sortBy = 'date' } = req.query;
      
      let query = { isPublic: true };
      
      if (category && category !== 'all') {
        query.category = category;
      }
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ];
      }

      let sort = {};
      switch (sortBy) {
        case 'name':
          sort = { name: 1 };
          break;
        case 'size':
          sort = { size: -1 };
          break;
        case 'downloads':
          sort = { downloadCount: -1 };
          break;
        case 'date':
        default:
          sort = { uploadedAt: -1 };
          break;
      }

      const files = await File.find(query)
        .populate('uploadedBy', 'name email image')
        .sort(sort)
        .limit(50);

      res.status(200).json(files);
    } catch (error) {
      console.error("Error fetching files:", error);
      res.status(500).json({ error: "Failed to fetch files" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
