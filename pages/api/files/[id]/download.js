import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import dbConnect from "../../../../lib/mongodb";
import File from "../../../../models/File";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  try {
    const { id } = req.query;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Check if file exists on disk
    const filePath = path.join(process.cwd(), file.filePath);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found on disk" });
    }

    // Increment download count
    await File.findByIdAndUpdate(id, { $inc: { downloadCount: 1 } });

    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Failed to download file" });
  }
}
