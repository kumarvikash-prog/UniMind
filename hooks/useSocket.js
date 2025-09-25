import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      maxReconnectionAttempts: 5
    });

    socketInstance.on('connect', () => {
      console.log('Connected to Socket.IO server');
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      setConnected(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.warn('Socket connection error (will retry):', error.message);
      setConnected(false);
    });

    socketInstance.on('reconnect', () => {
      console.log('Reconnected to Socket.IO server');
      setConnected(true);
    });

    socketInstance.on('reconnect_error', (error) => {
      console.warn('Reconnection error:', error.message);
    });

    socketInstance.on('reconnect_failed', () => {
      console.warn('Failed to reconnect to Socket.IO server');
      setConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.close();
    };
  }, []);

  return { socket, connected };
};

export const useSocketRoom = (roomType, roomId) => {
  const { socket, connected } = useSocket();
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (!socket || !connected) return;

    // Join the appropriate room on the server with matching event names
    const joinEvent = roomType === 'general' ? 'join-general-room' : roomType === 'file' ? 'join-file-room' : 'join-task-room';
    if (roomType === 'general') {
      socket.emit(joinEvent);
    } else if (roomId) {
      socket.emit(joinEvent, roomId);
    }

    // Listen for new messages
    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    // Listen for typing indicators
    const handleUserTyping = (data) => {
      setTypingUsers(prev => {
        if (data.isTyping) {
          return [...prev.filter(user => user.id !== data.user.id), data.user];
        } else {
          return prev.filter(user => user.id !== data.user.id);
        }
      });
    };

    socket.on('new-message', handleNewMessage);
    socket.on('user-typing', handleUserTyping);

    return () => {
      socket.off('new-message', handleNewMessage);
      socket.off('user-typing', handleUserTyping);
    };
  }, [socket, connected, roomType, roomId]);

  const sendMessage = (content, user) => {
    if (!socket || !connected) return;

    socket.emit('send-message', {
      content,
      [roomType === 'file' ? 'fileId' : 'taskId']: roomId,
      room: roomType,
      user
    });
  };

  const startTyping = (user) => {
    if (!socket || !connected) return;

    socket.emit('typing-start', {
      [roomType === 'file' ? 'fileId' : 'taskId']: roomId,
      user
    });
  };

  const stopTyping = (user) => {
    if (!socket || !connected) return;

    socket.emit('typing-stop', {
      [roomType === 'file' ? 'fileId' : 'taskId']: roomId,
      user
    });
  };

  return {
    socket,
    connected,
    messages,
    typingUsers,
    sendMessage,
    startTyping,
    stopTyping
  };
};
