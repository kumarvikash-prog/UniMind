import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar,
  User,
  Clock,
  CheckCircle,
  Circle,
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";
import { AuthenticatedNavbar } from "../components/AuthenticatedNavbar";
import { HolographicButton } from "../components/HolographicButton";

const Tasks = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');

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

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: 'Review UI Design Mockups',
      description: 'Review the latest design mockups and provide feedback on user experience',
      status: 'in-progress',
      priority: 'high',
      assignee: { name: 'Alice Johnson', avatar: '/api/placeholder/32/32' },
      dueDate: '2024-01-20',
      createdAt: '2024-01-15',
      tags: ['design', 'ui', 'review']
    },
    {
      id: 2,
      title: 'Implement Authentication System',
      description: 'Set up Google OAuth integration and user management',
      status: 'completed',
      priority: 'high',
      assignee: { name: 'Bob Smith', avatar: '/api/placeholder/32/32' },
      dueDate: '2024-01-18',
      createdAt: '2024-01-10',
      tags: ['backend', 'auth', 'security']
    },
    {
      id: 3,
      title: 'Write API Documentation',
      description: 'Create comprehensive API documentation for the project',
      status: 'todo',
      priority: 'medium',
      assignee: { name: 'Charlie Brown', avatar: '/api/placeholder/32/32' },
      dueDate: '2024-01-25',
      createdAt: '2024-01-12',
      tags: ['documentation', 'api']
    },
    {
      id: 4,
      title: 'Database Optimization',
      description: 'Optimize database queries and add proper indexing',
      status: 'in-progress',
      priority: 'medium',
      assignee: { name: 'Diana Prince', avatar: '/api/placeholder/32/32' },
      dueDate: '2024-01-22',
      createdAt: '2024-01-14',
      tags: ['database', 'optimization', 'performance']
    },
    {
      id: 5,
      title: 'Mobile Responsiveness Testing',
      description: 'Test and fix mobile responsiveness issues across all pages',
      status: 'todo',
      priority: 'low',
      assignee: { name: 'Alice Johnson', avatar: '/api/placeholder/32/32' },
      dueDate: '2024-01-28',
      createdAt: '2024-01-16',
      tags: ['mobile', 'testing', 'responsive']
    }
  ];

  const teamMembers = [
    { id: 'all', name: 'All Members' },
    { id: 'alice', name: 'Alice Johnson' },
    { id: 'bob', name: 'Bob Smith' },
    { id: 'charlie', name: 'Charlie Brown' },
    { id: 'diana', name: 'Diana Prince' }
  ];

  const statusOptions = [
    { id: 'all', name: 'All Tasks', color: 'gray' },
    { id: 'todo', name: 'To Do', color: 'blue' },
    { id: 'in-progress', name: 'In Progress', color: 'yellow' },
    { id: 'completed', name: 'Completed', color: 'green' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo': return Circle;
      case 'in-progress': return Clock;
      case 'completed': return CheckCircle;
      default: return Circle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'text-blue-400 bg-blue-500/20';
      case 'in-progress': return 'text-yellow-400 bg-yellow-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = selectedStatus === 'all' || task.status === selectedStatus;
    const assigneeMatch = selectedAssignee === 'all' || task.assignee.name.toLowerCase().includes(selectedAssignee.toLowerCase());
    return statusMatch && assigneeMatch;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AuthenticatedNavbar currentPage="tasks" />
      
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
              <h1 className="text-3xl font-bold text-white mb-2">Tasks</h1>
              <p className="text-gray-400">Manage team tasks and assignments</p>
            </div>
            <HolographicButton onClick={() => router.push('/tasks/new')}>
              <Plus className="w-4 h-4" />
              New Task
            </HolographicButton>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total', value: taskStats.total, color: 'from-blue-500 to-cyan-500' },
              { label: 'Completed', value: taskStats.completed, color: 'from-green-500 to-emerald-500' },
              { label: 'In Progress', value: taskStats.inProgress, color: 'from-yellow-500 to-orange-500' },
              { label: 'To Do', value: taskStats.todo, color: 'from-purple-500 to-pink-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-4"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3`}>
                  <span className="text-white font-bold text-lg">{stat.value}</span>
                </div>
                <p className="text-white font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Status:</span>
              <div className="flex bg-white/10 rounded-lg p-1">
                {statusOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedStatus(option.id)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      selectedStatus === option.id 
                        ? 'bg-white/20 text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Assignee:</span>
              <select
                value={selectedAssignee}
                onChange={(e) => setSelectedAssignee(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id} className="bg-slate-800">
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2 ml-auto">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Search className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Filter className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tasks List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {filteredTasks.map((task, index) => {
            const StatusIcon = getStatusIcon(task.status);
            
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-white/10 transition-colors cursor-pointer group"
                onClick={() => router.push(`/tasks/${task.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Status Icon */}
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <StatusIcon className="w-5 h-5 text-white" />
                    </div>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-400 mb-4">{task.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Assignee */}
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {task.assignee.name.charAt(0)}
                              </span>
                            </div>
                            <span className="text-white text-sm font-medium">
                              {task.assignee.name}
                            </span>
                          </div>

                          {/* Due Date */}
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>

                          {/* Tags */}
                          <div className="flex items-center space-x-2">
                            {task.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-400">
                                {tag}
                              </span>
                            ))}
                            {task.tags.length > 2 && (
                              <span className="text-xs text-gray-500">+{task.tags.length - 2}</span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/tasks/${task.id}/edit`);
                            }}
                          >
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button 
                            className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle delete
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or create a new task</p>
            <HolographicButton onClick={() => router.push('/tasks/new')}>
              <Plus className="w-4 h-4" />
              Create New Task
            </HolographicButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
