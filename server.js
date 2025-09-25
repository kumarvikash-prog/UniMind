const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3001;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room for file-specific chat
    socket.on('join-file-room', (fileId) => {
      socket.join(`file-${fileId}`);
      console.log(`User ${socket.id} joined file room: file-${fileId}`);
    });

    // Join room for task-specific chat
    socket.on('join-task-room', (taskId) => {
      socket.join(`task-${taskId}`);
      console.log(`User ${socket.id} joined task room: task-${taskId}`);
    });

    // Join general chat room
    socket.on('join-general-room', () => {
      socket.join('general');
      console.log(`User ${socket.id} joined general room`);
    });

    // Handle new message
    socket.on('send-message', async (data) => {
      try {
        const { content, fileId, taskId, room, user } = data;
        
        // Broadcast message to appropriate room
        const roomName = fileId ? `file-${fileId}` : taskId ? `task-${taskId}` : 'general';
        
        // Emit to all clients in the room
        io.to(roomName).emit('new-message', {
          id: Date.now().toString(),
          content,
          author: user,
          createdAt: new Date().toISOString(),
          fileId,
          taskId,
          room: roomName
        });

        console.log(`Message sent to room ${roomName}:`, content);
      } catch (error) {
        console.error('Error handling message:', error);
        socket.emit('message-error', { error: 'Failed to send message' });
      }
    });

    // Handle file activity updates
    socket.on('file-activity', (data) => {
      const { fileId, activity, user } = data;
      io.to(`file-${fileId}`).emit('file-activity-update', {
        fileId,
        activity,
        user,
        timestamp: new Date().toISOString()
      });
    });

    // Handle task updates
    socket.on('task-update', (data) => {
      const { taskId, update, user } = data;
      io.to(`task-${taskId}`).emit('task-update-notification', {
        taskId,
        update,
        user,
        timestamp: new Date().toISOString()
      });
    });

    // Handle contribution updates
    socket.on('contribution-update', (data) => {
      io.emit('new-contribution', data);
    });

    // Handle user typing indicators
    socket.on('typing-start', (data) => {
      const { fileId, taskId, user } = data;
      const roomName = fileId ? `file-${fileId}` : taskId ? `task-${taskId}` : 'general';
      socket.to(roomName).emit('user-typing', { user, isTyping: true });
    });

    socket.on('typing-stop', (data) => {
      const { fileId, taskId, user } = data;
      const roomName = fileId ? `file-${fileId}` : taskId ? `task-${taskId}` : 'general';
      socket.to(roomName).emit('user-typing', { user, isTyping: false });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Socket.IO server ready on http://${hostname}:${port}`);
  });
});
