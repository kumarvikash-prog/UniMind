import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Calendar,
  User,
  Tag,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { AuthenticatedNavbar } from "../../components/AuthenticatedNavbar";
import { HolographicButton } from "../../components/HolographicButton";
import axios from "axios";

const NewTask = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: 'medium',
    tags: ''
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
      return;
    }
    
    fetchTeamMembers();
  }, [session, status, router]);

  const fetchTeamMembers = async () => {
    try {
      // Get team members from contributions or users
      const response = await axios.get('/api/contributions');
      const contributions = response.data;
      
      const uniqueUsers = Array.from(new Set(
        contributions.map(c => c.user?.name).filter(Boolean)
      ));
      
      setTeamMembers(uniqueUsers.map(name => ({ name, email: name.toLowerCase().replace(' ', '.') + '@example.com' })));
    } catch (err) {
      console.error('Failed to fetch team members:', err);
      // Fallback to mock data
      setTeamMembers([
        { name: 'Alice Johnson', email: 'alice@example.com' },
        { name: 'Bob Smith', email: 'bob@example.com' },
        { name: 'Charlie Brown', email: 'charlie@example.com' },
        { name: 'Diana Prince', email: 'diana@example.com' }
      ]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.assignee.trim()) {
      setError('Title and assignee are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const taskData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
      };

      await axios.post('/api/tasks', taskData);
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/tasks');
      }, 2000);
    } catch (err: any) {
      console.error('Failed to create task:', err);
      setError(err.response?.data?.error || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AuthenticatedNavbar currentPage="tasks" />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/tasks")}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Create New Task</h1>
                <p className="text-gray-400">Assign tasks to team members</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="text-green-400 font-semibold">Task Created Successfully!</h3>
                <p className="text-green-300 text-sm">
                  The task has been assigned and will appear in the tasks list. Redirecting...
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="text-red-400 font-semibold">Error</h3>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Task Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-white font-medium mb-2">
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter task title..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-white font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter task description..."
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assignee */}
              <div>
                <label htmlFor="assignee" className="block text-white font-medium mb-2">
                  Assignee *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    id="assignee"
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" className="bg-slate-800">Select assignee...</option>
                    {teamMembers.map((member) => (
                      <option key={member.name} value={member.name} className="bg-slate-800">
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-white font-medium mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low" className="bg-slate-800">Low</option>
                  <option value="medium" className="bg-slate-800">Medium</option>
                  <option value="high" className="bg-slate-800">High</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Due Date */}
              <div>
                <label htmlFor="dueDate" className="block text-white font-medium mb-2">
                  Due Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-white font-medium mb-2">
                  Tags
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags separated by commas..."
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => router.push("/tasks")}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.title.trim() || !formData.assignee.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 disabled:scale-100"
              >
                {loading ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Form Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Task Creation Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <h4 className="text-white font-medium mb-2">Required Fields</h4>
              <ul className="space-y-1">
                <li>• Task title (descriptive and clear)</li>
                <li>• Assignee (team member responsible)</li>
                <li>• Priority level (low, medium, high)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Optional Fields</h4>
              <ul className="space-y-1">
                <li>• Description (detailed requirements)</li>
                <li>• Due date (deadline for completion)</li>
                <li>• Tags (for categorization and search)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewTask;
