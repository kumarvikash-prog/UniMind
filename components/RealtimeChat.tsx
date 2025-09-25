import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  MessageSquare, 
  Users, 
  Clock,
  Smile,
  MoreVertical
} from 'lucide-react';
import { useSocketRoom } from '../hooks/useSocket';
import axios from 'axios';

interface RealtimeChatProps {
  fileId?: string;
  taskId?: string;
  roomType: 'file' | 'task' | 'general';
  onMessageSent?: (message: any) => void;
}

export const RealtimeChat = ({ fileId, taskId, roomType, onMessageSent }: RealtimeChatProps) => {
  const { data: session } = useSession();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const roomId = fileId || taskId || 'general';
  const { 
    socket, 
    connected, 
    messages, 
    typingUsers, 
    sendMessage, 
    startTyping, 
    stopTyping 
  } = useSocketRoom(roomType, roomId);

  // Fallback state for when Socket.IO is not available
  const [fallbackMessages, setFallbackMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Load existing messages from API (always fetch on mount/room change)
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoadingMessages(true);
      try {
        const params = new URLSearchParams();
        if (fileId) params.append('fileId', fileId);
        if (taskId) params.append('taskId', taskId);
        if (roomType === 'general') params.append('room', 'general');

        const response = await axios.get(`/api/messages?${params.toString()}`);
        setFallbackMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [fileId, taskId, roomType]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, fallbackMessages]);

  // Merge persisted history with realtime updates
  const displayMessages = connected && messages.length > 0
    ? [...fallbackMessages, ...messages]
    : fallbackMessages;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session?.user) return;

    const messageData = {
      content: newMessage.trim(),
      author: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image
      }
    };

    // Save to database via API
    try {
      const response = await axios.post('/api/messages', {
        content: newMessage.trim(),
        fileId,
        taskId,
        room: roomType === 'general' ? 'general' : undefined
      });

      // If connected to Socket.IO, send real-time message
      if (connected) {
        sendMessage(newMessage.trim(), messageData.author);
      } else {
        // If not connected, add to fallback messages
        setFallbackMessages(prev => [...prev, response.data]);
      }
    } catch (error) {
      console.error('Failed to save message:', error);
    }

    setNewMessage('');
    stopTyping(messageData.author);
    setIsTyping(false);

    if (onMessageSent) {
      onMessageSent(messageData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);

    if (!session?.user) return;

    const user = {
      id: session.user.email,
      name: session.user.name,
      image: session.user.image
    };

    if (value.trim() && !isTyping) {
      setIsTyping(true);
      startTyping(user);
    }

    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout to stop typing
    const timeout = setTimeout(() => {
      stopTyping(user);
      setIsTyping(false);
    }, 1000);

    setTypingTimeout(timeout);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTypingText = () => {
    if (typingUsers.length === 0) return '';
    if (typingUsers.length === 1) return `${typingUsers[0].name} is typing...`;
    if (typingUsers.length === 2) return `${typingUsers[0].name} and ${typingUsers[1].name} are typing...`;
    return `${typingUsers.length} people are typing...`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">
              {roomType === 'file' ? 'File Discussion' : 
               roomType === 'task' ? 'Task Discussion' : 'General Chat'}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`} />
              <span>{connected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Users className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isLoadingMessages ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading messages...</p>
                </div>
              ) : displayMessages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {displayMessages.map((message, index) => (
              <motion.div
                key={message.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-start space-x-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  {message.author?.image ? (
                    <img
                      src={message.author.image}
                      alt={message.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="text-white text-sm font-medium">
                      {message.author?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-white font-medium text-sm">
                      {message.author?.name || 'Unknown'}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm break-words">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 text-gray-400 text-sm italic"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <span>{getTypingText()}</span>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={false}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
            >
              <Smile className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
