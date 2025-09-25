import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }],
  filePath: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['documents', 'images', 'videos', 'design', 'code', 'other'],
    default: 'other'
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Prevent recompilation in dev mode
export default mongoose.models.File || mongoose.model("File", FileSchema);
