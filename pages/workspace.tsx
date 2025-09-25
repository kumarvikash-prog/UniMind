import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  Upload, 
  MessageSquare, 
  Clock, 
  Users, 
  FileText, 
  BarChart3,
  FolderOpen,
  Plus,
  Search,
  Filter,
  RefreshCw
} from "lucide-react";
import { HolographicButton } from "../components/HolographicButton";
import { AuthenticatedNavbar } from "../components/AuthenticatedNavbar";

const Workspace = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/"); // Redirect to landing page if not authenticated
      return;
    }
    fetchRecentActivity();
  }, [session, status, router]);

  const fetchRecentActivity = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/contributions?limit=5', {
        withCredentials: true
      });
      const contributions = response.data;
      
      const activities = contributions.map(contrib => ({
        type: contrib.type,
        title: contrib.title,
        user: contrib.user?.name || 'Unknown User',
        time: formatTimeAgo(contrib.createdAt),
        id: contrib._id
      }));
      
      setRecentActivity(activities);
    } catch (error) {
      console.error('Failed to fetch recent activity:', error);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        console.error('Authentication required - redirecting to login');
        router.push('/');
        return;
      } else if (error.response?.status === 500) {
        console.error('Server error:', error.response.data);
      }
      
      // Show empty state if no data
      setRecentActivity([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  const quickActions = [
    {
      title: "Upload Files",
      description: "Share documents, images, and resources",
      icon: Upload,
      color: "from-blue-500 to-cyan-500",
      href: "/hub"
    },
    {
      title: "General Chat",
      description: "Team discussions and announcements",
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
      href: "/chat"
    },
    {
      title: "View Timeline",
      description: "See all team contributions",
      icon: Clock,
      color: "from-purple-500 to-pink-500",
      href: "/contributions"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <AuthenticatedNavbar currentPage="workspace" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 cursor-pointer group"
                onClick={() => router.push(action.href)}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-gray-400">{action.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Recent Activity</h3>
              <button
                onClick={fetchRecentActivity}
                disabled={loading}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
                title="Refresh activity"
              >
                <RefreshCw className={`w-5 h-5 text-white ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading recent activity...</p>
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-400">No recent activity yet</p>
                  <p className="text-gray-500 text-sm mt-2">Start by uploading files or creating tasks!</p>
                </div>
              ) : (
                recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="glass-card p-4 flex items-center space-x-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      {activity.type === "file" ? (
                        <FileText className="w-5 h-5 text-white" />
                      ) : activity.type === "task" ? (
                        <Clock className="w-5 h-5 text-white" />
                      ) : (
                        <MessageSquare className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.title}</p>
                      <p className="text-gray-400 text-sm">by {activity.user} • {activity.time}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.section>

          {/* Navigation Menu */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Navigate</h3>
            
            <div className="space-y-3">
              {[
                { name: "Contributions", icon: Users, href: "/contributions", desc: "Track team contributions" },
                { name: "Tasks", icon: Clock, href: "/tasks", desc: "Manage team tasks" },
                { name: "Analytics", icon: BarChart3, href: "/analytics", desc: "View performance metrics" },
                { name: "Hub", icon: FolderOpen, href: "/hub", desc: "Browse all files" },
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  onClick={() => router.push(item.href)}
                  className="w-full glass-card p-4 text-left hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Quick Upload */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-card p-6"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Quick Upload</h4>
              <HolographicButton 
                onClick={() => router.push("/hub")}
                className="w-full justify-center"
              >
                <Plus className="w-4 h-4" />
                Upload New File
              </HolographicButton>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
