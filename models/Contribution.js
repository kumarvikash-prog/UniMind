import mongoose from "mongoose";

const ContributionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['file', 'message', 'task', 'comment'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  metadata: {
    fileType: String,
    fileSize: String,
    messageCount: Number,
    taskStatus: String
  }
}, {
  timestamps: true
});

// Prevent recompilation in dev mode
export default mongoose.models.Contribution || mongoose.model("Contribution", ContributionSchema);
