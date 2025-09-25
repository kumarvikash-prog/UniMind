import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Clock, 
  FileText, 
  MessageSquare, 
  Calendar,
  Filter,
  Search,
  Download,
  Eye
} from "lucide-react";
import { AuthenticatedNavbar } from "../components/AuthenticatedNavbar";

const Contributions = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'master' | 'member'>('master');
  const [selectedMember, setSelectedMember] = useState<string>('all');

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Mock data for contributions
  const contributions = [
    {
      id: 1,
      type: 'file',
      title: 'Project Requirements Document',
      user: { name: 'Alice Johnson', avatar: '/api/placeholder/32/32' },
      timestamp: '2024-01-15T10:30:00Z',
      description: 'Uploaded comprehensive project requirements',
      fileType: 'pdf',
      size: '2.4 MB'
    },
    {
      id: 2,
      type: 'message',
      title: 'Team Discussion: UI Design',
      user: { name: 'Bob Smith', avatar: '/api/placeholder/32/32' },
      timestamp: '2024-01-15T09:15:00Z',
      description: 'Started discussion about new UI components',
      messageCount: 12
    },
    {
      id: 3,
      type: 'file',
      title: 'Design Mockups v2.0',
      user: { name: 'Charlie Brown', avatar: '/api/placeholder/32/32' },
      timestamp: '2024-01-14T16:45:00Z',
      description: 'Updated design mockups with new features',
      fileType: 'fig',
      size: '5.1 MB'
    },
    {
      id: 4,
      type: 'task',
      title: 'Completed: Database Schema Review',
      user: { name: 'Diana Prince', avatar: '/api/placeholder/32/32' },
      timestamp: '2024-01-14T14:20:00Z',
      description: 'Reviewed and approved database schema changes',
      status: 'completed'
    }
  ];

  const teamMembers = [
    { id: 'all', name: 'All Members', avatar: null },
    { id: 'alice', name: 'Alice Johnson', avatar: '/api/placeholder/32/32' },
    { id: 'bob', name: 'Bob Smith', avatar: '/api/placeholder/32/32' },
    { id: 'charlie', name: 'Charlie Brown', avatar: '/api/placeholder/32/32' },
    { id: 'diana', name: 'Diana Prince', avatar: '/api/placeholder/32/32' }
  ];

  const getContributionIcon = (type: string) => {
    switch (type) {
      case 'file': return FileText;
      case 'message': return MessageSquare;
      case 'task': return Clock;
      default: return FileText;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AuthenticatedNavbar currentPage="contributions" />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Contributions</h1>
              <p className="text-gray-400">Track team contributions and activity timeline</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Search className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Filter className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Download className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('master')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'master' 
                    ? 'bg-white/20 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Master Timeline
              </button>
              <button
                onClick={() => setViewMode('member')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'member' 
                    ? 'bg-white/20 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Member View
              </button>
            </div>

            {viewMode === 'member' && (
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id} className="bg-slate-800">
                    {member.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </motion.div>

        {/* Contributions Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {contributions.map((contribution, index) => {
            const IconComponent = getContributionIcon(contribution.type);
            
            return (
              <motion.div
                key={contribution.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  if (contribution.type === 'file') {
                    router.push(`/file/${contribution.id}`);
                  }
                }}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {contribution.title}
                      </h3>
                      <span className="text-sm text-gray-400 flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimestamp(contribution.timestamp)}</span>
                      </span>
                    </div>

                    <p className="text-gray-400 mb-3">{contribution.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* User Info */}
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {contribution.user.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-white text-sm font-medium">
                            {contribution.user.name}
                          </span>
                        </div>

                        {/* Additional Info */}
                        {contribution.type === 'file' && (
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span className="uppercase font-medium">{contribution.fileType}</span>
                            <span>•</span>
                            <span>{contribution.size}</span>
                          </div>
                        )}

                        {contribution.type === 'message' && (
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <MessageSquare className="w-4 h-4" />
                            <span>{contribution.messageCount} messages</span>
                          </div>
                        )}

                        {contribution.type === 'task' && (
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              contribution.status === 'completed' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {contribution.status}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        {contribution.type === 'file' && (
                          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <Download className="w-4 h-4 text-gray-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors">
            Load More Contributions
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Contributions;
