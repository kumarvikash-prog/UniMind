import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  type: {
    type: String,
    enum: ['file', 'general', 'task'],
    default: 'general'
  },
  room: {
    type: String,
    default: 'general'
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date
  },
  reactions: [{
    emoji: String,
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }]
}, {
  timestamps: true
});

// Prevent recompilation in dev mode
export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
