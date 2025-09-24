import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  Share2, 
  Eye, 
  MessageSquare, 
  Calendar, 
  User, 
  Tag,
  ArrowLeft,
  MoreVertical,
  ThumbsUp,
  Bookmark,
  ExternalLink
} from "lucide-react";
import { AuthenticatedNavbar } from "../../components/AuthenticatedNavbar";
import { HolographicButton } from "../../components/HolographicButton";

const FileDetail = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [file, setFile] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
      return;
    }

    // Mock data loading
    const mockFile = {
      id: id,
      name: 'Project Requirements Document.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'Alice Johnson',
      uploadedAt: '2024-01-15T10:30:00Z',
      description: 'Comprehensive project requirements document outlining all features, user stories, and technical specifications for the UniMind platform.',
      downloadCount: 12,
      tags: ['requirements', 'project', 'planning', 'documentation'],
      content: 'This is a comprehensive project requirements document...',
      lastModified: '2024-01-15T10:30:00Z'
    };

    const mockMessages = [
      {
        id: 1,
        content: 'Great work on this document! The requirements are very clear and comprehensive.',
        author: 'Bob Smith',
        timestamp: '2024-01-15T11:00:00Z',
        avatar: '/api/placeholder/32/32'
      },
      {
        id: 2,
        content: 'I have a few questions about the authentication flow. Can we discuss the OAuth implementation?',
        author: 'Charlie Brown',
        timestamp: '2024-01-15T11:30:00Z',
        avatar: '/api/placeholder/32/32'
      },
      {
        id: 3,
        content: 'Sure! I\'ll add more details about the OAuth flow in the next version.',
        author: 'Alice Johnson',
        timestamp: '2024-01-15T12:00:00Z',
        avatar: '/api/placeholder/32/32'
      }
    ];

    setTimeout(() => {
      setFile(mockFile);
      setMessages(mockMessages);
      setIsLoading(false);
    }, 1000);
  }, [session, status, router, id]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!file) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <AuthenticatedNavbar currentPage="hub" />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">File not found</h1>
            <p className="text-gray-400 mb-6">The file you're looking for doesn't exist or has been removed.</p>
            <HolographicButton onClick={() => router.push('/hub')}>
              <ArrowLeft className="w-4 h-4" />
              Back to Hub
            </HolographicButton>
          </div>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      content: newMessage,
      author: session.user.name,
      timestamp: new Date().toISOString(),
      avatar: session.user.image
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'fig': return '🎨';
      case 'jpg':
      case 'png': return '🖼️';
      case 'mp4': return '🎥';
      case 'sql': return '🗄️';
      default: return '📁';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AuthenticatedNavbar currentPage="hub" />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-8 mb-6">
              {/* File Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-2xl">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">{file.name}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.downloadCount} downloads</span>
                      <span>•</span>
                      <span>{file.type.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <ThumbsUp className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Bookmark className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* File Actions */}
              <div className="flex items-center space-x-4 mb-6">
                <HolographicButton onClick={() => {}}>
                  <Download className="w-4 h-4" />
                  Download
                </HolographicButton>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                  <Share2 className="w-4 h-4 inline mr-2" />
                  Share
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                  <ExternalLink className="w-4 h-4 inline mr-2" />
                  Open
                </button>
              </div>

              {/* File Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-400 leading-relaxed">{file.description}</p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {file.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-400">
                      <Tag className="w-3 h-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* File Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Uploaded by</p>
                    <p className="text-white font-medium">{file.uploadedBy}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Uploaded on</p>
                    <p className="text-white font-medium">{formatDate(file.uploadedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* File Content Preview */}
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
              <div className="bg-white/5 rounded-lg p-6 min-h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-4xl">
                    {getFileIcon(file.type)}
                  </div>
                  <p className="text-gray-400">Preview not available for this file type</p>
                  <p className="text-sm text-gray-500 mt-2">Click "Open" to view the full file</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Context Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Chat Header */}
            <div className="glass-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Context Chat</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Discuss this file with your team members
              </p>
            </div>

            {/* Messages */}
            <div className="glass-card p-6">
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">
                        {message.author.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium text-sm">{message.author}</span>
                        <span className="text-gray-500 text-xs">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                >
                  Send
                </button>
              </div>
            </div>

            {/* Related Files */}
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Related Files</h4>
              <div className="space-y-3">
                {[
                  { name: 'Design Mockups v2.0.fig', type: 'fig' },
                  { name: 'Database Schema.sql', type: 'sql' },
                  { name: 'API Documentation.pdf', type: 'pdf' }
                ].map((relatedFile, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => router.push(`/file/${index + 10}`)}
                  >
                    <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm">
                      {getFileIcon(relatedFile.type)}
                    </div>
                    <span className="text-white text-sm truncate">{relatedFile.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FileDetail;
