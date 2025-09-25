import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock,
  FileText,
  MessageSquare,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import { AuthenticatedNavbar } from "../components/AuthenticatedNavbar";

const Analytics = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [selectedMetric, setSelectedMetric] = useState<string>('contributions');

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

  // Mock data for analytics
  const teamStats = {
    totalMembers: 5,
    totalContributions: 47,
    totalTasks: 23,
    totalFiles: 156,
    avgResponseTime: '2.3h',
    activeUsers: 4
  };

  const contributionData = [
    { name: 'Alice Johnson', contributions: 12, files: 8, messages: 24, tasks: 5 },
    { name: 'Bob Smith', contributions: 10, files: 6, messages: 18, tasks: 7 },
    { name: 'Charlie Brown', contributions: 8, files: 4, messages: 15, tasks: 3 },
    { name: 'Diana Prince', contributions: 9, files: 5, messages: 12, tasks: 4 },
    { name: 'Eve Wilson', contributions: 8, files: 3, messages: 10, tasks: 4 }
  ];

  const weeklyData = [
    { day: 'Mon', contributions: 8, tasks: 3, files: 5 },
    { day: 'Tue', contributions: 12, tasks: 5, files: 7 },
    { day: 'Wed', contributions: 6, tasks: 2, files: 4 },
    { day: 'Thu', contributions: 15, tasks: 7, files: 9 },
    { day: 'Fri', contributions: 10, tasks: 4, files: 6 },
    { day: 'Sat', contributions: 4, tasks: 1, files: 2 },
    { day: 'Sun', contributions: 2, tasks: 1, files: 1 }
  ];

  const activityTypes = [
    { type: 'Files', count: 156, color: 'from-blue-500 to-cyan-500', icon: FileText },
    { type: 'Messages', count: 89, color: 'from-green-500 to-emerald-500', icon: MessageSquare },
    { type: 'Tasks', count: 23, color: 'from-purple-500 to-pink-500', icon: Clock },
    { type: 'Contributions', count: 47, color: 'from-yellow-500 to-orange-500', icon: Users }
  ];

  const getMaxValue = (data: any[], key: string) => {
    return Math.max(...data.map(item => item[key]));
  };

  const getBarHeight = (value: number, maxValue: number) => {
    return (value / maxValue) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AuthenticatedNavbar currentPage="analytics" />
      
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
              <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
              <p className="text-gray-400">Team performance and contribution insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d" className="bg-slate-800">Last 7 days</option>
                <option value="30d" className="bg-slate-800">Last 30 days</option>
                <option value="90d" className="bg-slate-800">Last 90 days</option>
              </select>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <RefreshCw className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Download className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: 'Team Members', value: teamStats.totalMembers, icon: Users, color: 'from-blue-500 to-cyan-500' },
              { label: 'Contributions', value: teamStats.totalContributions, icon: BarChart3, color: 'from-green-500 to-emerald-500' },
              { label: 'Tasks', value: teamStats.totalTasks, icon: Clock, color: 'from-purple-500 to-pink-500' },
              { label: 'Files', value: teamStats.totalFiles, icon: FileText, color: 'from-yellow-500 to-orange-500' },
              { label: 'Active Users', value: teamStats.activeUsers, icon: TrendingUp, color: 'from-red-500 to-pink-500' },
              { label: 'Avg Response', value: teamStats.avgResponseTime, icon: MessageSquare, color: 'from-indigo-500 to-purple-500' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-4"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center mb-3`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-white font-bold text-xl mb-1">{metric.value}</p>
                <p className="text-gray-400 text-sm">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Activity Types */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Activity Types</h3>
            <div className="space-y-4">
              {activityTypes.map((activity, index) => (
                <motion.div
                  key={activity.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${activity.color} flex items-center justify-center`}>
                      <activity.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium">{activity.type}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${activity.color}`}
                        style={{ width: `${(activity.count / Math.max(...activityTypes.map(a => a.count))) * 100}%` }}
                      />
                    </div>
                    <span className="text-white font-bold w-12 text-right">{activity.count}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Weekly Activity</h3>
            <div className="space-y-4">
              {weeklyData.map((day, index) => {
                const maxContributions = getMaxValue(weeklyData, 'contributions');
                const contributionHeight = getBarHeight(day.contributions, maxContributions);
                
                return (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 text-white font-medium text-sm">{day.day}</div>
                    <div className="flex-1 flex items-end space-x-2 h-8">
                      <div className="flex flex-col items-center space-y-1">
                        <div 
                          className="w-6 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t"
                          style={{ height: `${contributionHeight}%` }}
                        />
                        <span className="text-xs text-gray-400">{day.contributions}</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <div 
                          className="w-6 bg-gradient-to-t from-green-500 to-emerald-500 rounded-t"
                          style={{ height: `${getBarHeight(day.tasks, getMaxValue(weeklyData, 'tasks'))}%` }}
                        />
                        <span className="text-xs text-gray-400">{day.tasks}</span>
                      </div>
                      <div className="flex flex-col items-center space-y-1">
                        <div 
                          className="w-6 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
                          style={{ height: `${getBarHeight(day.files, getMaxValue(weeklyData, 'files'))}%` }}
                        />
                        <span className="text-xs text-gray-400">{day.files}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4 text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
                <span>Contributions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded"></div>
                <span>Tasks</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                <span>Files</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Contributions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Team Contributions</h3>
          <div className="space-y-4">
            {contributionData.map((member, index) => {
              const maxContributions = getMaxValue(contributionData, 'contributions');
              const contributionPercentage = (member.contributions / maxContributions) * 100;
              
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-gray-400 text-sm">{member.contributions} contributions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-white font-bold">{member.files}</p>
                      <p className="text-gray-400 text-xs">Files</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold">{member.messages}</p>
                      <p className="text-gray-400 text-xs">Messages</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold">{member.tasks}</p>
                      <p className="text-gray-400 text-xs">Tasks</p>
                    </div>
                    <div className="w-32 bg-white/10 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${contributionPercentage}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Top Contributors</h4>
            <div className="space-y-3">
              {contributionData.slice(0, 3).map((member, index) => (
                <div key={member.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-white font-medium">{member.name}</span>
                  </div>
                  <span className="text-white font-bold">{member.contributions}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Team Health</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Activity Level</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-white/10 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 w-4/5" />
                  </div>
                  <span className="text-white text-sm">High</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Collaboration</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-white/10 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 w-3/4" />
                  </div>
                  <span className="text-white text-sm">Good</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Response Time</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-white/10 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 w-2/3" />
                  </div>
                  <span className="text-white text-sm">Fast</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
