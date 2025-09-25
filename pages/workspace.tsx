import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";
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
  Filter
} from "lucide-react";
import { HolographicButton } from "../components/HolographicButton";
import { AuthenticatedNavbar } from "../components/AuthenticatedNavbar";

const Workspace = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/"); // Redirect to landing page if not authenticated
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

  const recentActivity = [
    { type: "file", title: "Project Requirements.pdf", user: "Alice", time: "2 hours ago" },
    { type: "message", title: "New task assigned", user: "Bob", time: "4 hours ago" },
    { type: "file", title: "Design Mockups.fig", user: "Charlie", time: "1 day ago" },
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
            <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card p-4 flex items-center space-x-4"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    {activity.type === "file" ? (
                      <FileText className="w-5 h-5 text-white" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-gray-400 text-sm">by {activity.user} • {activity.time}</p>
                  </div>
                </motion.div>
              ))}
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
