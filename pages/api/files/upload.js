import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongodb";
import File from "../../../models/File";
import User from "../../../models/User";
import Contribution from "../../../models/Contribution";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  try {
    const form = formidable({
      uploadDir: "./public/uploads",
      keepExtensions: true,
      maxFileSize: 100 * 1024 * 1024, // 100MB
    });

    const [fields, files] = await form.parse(req);
    
    const uploadedFiles = [];
    const fileArray = Array.isArray(files.files) ? files.files : [files.files];

    for (const file of fileArray) {
      if (!file) continue;

      // Get file extension and determine category
      const ext = path.extname(file.originalFilename).toLowerCase();
      let category = 'other';
      
      if (['.pdf', '.doc', '.docx', '.txt', '.rtf'].includes(ext)) {
        category = 'documents';
      } else if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'].includes(ext)) {
        category = 'images';
      } else if (['.mp4', '.avi', '.mov', '.wmv', '.flv'].includes(ext)) {
        category = 'videos';
      } else if (['.fig', '.psd', '.ai', '.sketch'].includes(ext)) {
        category = 'design';
      } else if (['.js', '.ts', '.py', '.java', '.cpp', '.sql', '.html', '.css'].includes(ext)) {
        category = 'code';
      }

      // Get user from database
      const user = await User.findOne({ email: session.user.email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create file record
      const fileRecord = new File({
        name: file.originalFilename,
        type: ext.substring(1),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploadedBy: user._id,
        filePath: file.filepath,
        category,
        description: fields.description?.[0] || '',
        tags: fields.tags?.[0] ? fields.tags[0].split(',').map(tag => tag.trim()) : []
      });

      await fileRecord.save();

      // Create contribution record
      const contribution = new Contribution({
        user: user._id,
        type: 'file',
        title: file.originalFilename,
        description: `Uploaded ${file.originalFilename}`,
        fileId: fileRecord._id,
        metadata: {
          fileType: ext.substring(1),
          fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`
        }
      });

      await contribution.save();

      // Populate the file with user data
      await fileRecord.populate('uploadedBy', 'name email image');
      uploadedFiles.push(fileRecord);
    }

    res.status(200).json({
      message: "Files uploaded successfully",
      files: uploadedFiles
    });

  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ error: "Failed to upload files" });
  }
}
