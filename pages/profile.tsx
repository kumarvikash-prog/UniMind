import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Calendar, 
  Settings,
  ArrowLeft,
  Edit
} from "lucide-react";
import { AuthenticatedNavbar } from "../components/AuthenticatedNavbar";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AuthenticatedNavbar currentPage="Profile" />
      
      <div className="pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            <h1 className="text-3xl font-bold gradient-text">Profile</h1>
            <p className="text-gray-300 mt-2">Manage your account information</p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900"></div>
                </div>

                {/* User Info */}
                <div>
                  <h2 className="text-2xl font-bold text-white">{session.user.name}</h2>
                  <p className="text-gray-300">{session.user.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Active</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                  <User className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="text-white font-medium">{session.user.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                  <Mail className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">{session.user.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Member Since</p>
                    <p className="text-white font-medium">September 2024</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                  <Settings className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-sm text-gray-400">Account Type</p>
                    <p className="text-white font-medium">Google Account</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold text-blue-400">12</p>
                  <p className="text-sm text-gray-400">Files Uploaded</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold text-green-400">8</p>
                  <p className="text-sm text-gray-400">Tasks Completed</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold text-purple-400">24</p>
                  <p className="text-sm text-gray-400">Messages Sent</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
