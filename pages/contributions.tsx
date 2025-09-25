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
import { useRealtimeUpdates } from "../hooks/useRealtimeUpdates";
import axios from "axios";

const Contributions = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'master' | 'member'>('master');
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contributions: realtimeContributions, connected } = useRealtimeUpdates();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
      return;
    }
    
    fetchContributions();
  }, [session, status, router]);

  const fetchContributions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedMember !== 'all') params.append('user', selectedMember);
      
      const response = await axios.get(`/api/contributions?${params.toString()}`);
      setContributions(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch contributions:', err);
      setError('Failed to load contributions');
    } finally {
      setLoading(false);
    }
  };

  // Refetch when member filter changes
  useEffect(() => {
    if (session) {
      fetchContributions();
    }
  }, [selectedMember]);

  // Update contributions when real-time updates arrive
  useEffect(() => {
    if (realtimeContributions.length > 0) {
      setContributions(prev => [...realtimeContributions, ...prev]);
    }
  }, [realtimeContributions]);

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

  // Get unique team members from contributions
  const teamMembers = [
    { id: 'all', name: 'All Members', avatar: null },
    ...Array.from(new Set(contributions.map(c => c.user?.name).filter(Boolean)))
      .map(name => ({ id: name.toLowerCase().replace(' ', ''), name, avatar: null }))
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

  const filteredContributions = contributions.filter(contribution => {
    if (selectedMember === 'all') return true;
    return contribution.user?.name?.toLowerCase().includes(selectedMember.toLowerCase());
  });

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
              <div className="flex items-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-gray-400">{connected ? 'Live Updates' : 'Offline'}</span>
              </div>
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={fetchContributions}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
            >
              Retry
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {filteredContributions.map((contribution, index) => {
            const IconComponent = getContributionIcon(contribution.type);
            
            return (
              <motion.div
                key={contribution._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  if (contribution.type === 'file' && contribution.fileId) {
                    router.push(`/file/${contribution.fileId}`);
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
                        <span>{formatTimestamp(contribution.createdAt)}</span>
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
                        {contribution.type === 'file' && contribution.metadata?.fileType && (
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span className="uppercase font-medium">{contribution.metadata.fileType}</span>
                            {contribution.metadata.fileSize && (
                              <>
                                <span>•</span>
                                <span>{contribution.metadata.fileSize}</span>
                              </>
                            )}
                          </div>
                        )}

                        {contribution.type === 'message' && (
                          <div className="flex items-center space-x-3">
                            {contribution.metadata?.messageCount && (
                              <div className="flex items-center space-x-2 text-sm text-gray-400">
                                <MessageSquare className="w-4 h-4" />
                                <span>{contribution.metadata.messageCount} message{contribution.metadata.messageCount > 1 ? 's' : ''}</span>
                              </div>
                            )}
                            {/* Context badge */}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${contribution.fileId
                              ? 'bg-blue-500/20 text-blue-300'
                              : contribution.taskId
                                ? 'bg-purple-500/20 text-purple-300'
                                : 'bg-gray-500/20 text-gray-300'}`}>
                              {contribution.fileId ? 'File chat' : contribution.taskId ? 'Task chat' : 'General chat'}
                            </span>
                          </div>
                        )}

                        {contribution.type === 'task' && contribution.metadata?.taskStatus && (
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              contribution.metadata.taskStatus === 'completed' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {contribution.metadata.taskStatus}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        {contribution.type === 'file' && contribution.fileId && (
                          <button 
                            onClick={() => router.push(`/file/${contribution.fileId}`)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          >
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
        )}

        {/* Empty State */}
        {filteredContributions.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No contributions found</h3>
            <p className="text-gray-400 mb-6">Start by uploading files or creating tasks to see activity here</p>
          </motion.div>
        )}

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
