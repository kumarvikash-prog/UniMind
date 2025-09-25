import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreVertical,
  Download,
  Eye,
  Trash2,
  Share2,
  Folder,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Calendar,
  User
} from "lucide-react";
import { AuthenticatedNavbar } from "../components/AuthenticatedNavbar";
import { HolographicButton } from "../components/HolographicButton";
import axios from "axios";

const Hub = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
      return;
    }
    
    // Fetch files from API
    fetchFiles();
  }, [session, status, router]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      params.append('sortBy', sortBy);
      
      const response = await axios.get(`/api/files?${params.toString()}`);
      setFiles(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch files:', err);
      setError('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  // Refetch files when filters change
  useEffect(() => {
    if (session) {
      fetchFiles();
    }
  }, [selectedCategory, searchQuery, sortBy]);

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

  // Helper functions for file data

  const categories = [
    { id: 'all', name: 'All Files', icon: Folder },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'images', name: 'Images', icon: Image },
    { id: 'videos', name: 'Videos', icon: Video },
    { id: 'design', name: 'Design', icon: Grid },
    { id: 'code', name: 'Code', icon: Archive }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'fig': return Grid;
      case 'jpg':
      case 'png':
      case 'gif': return Image;
      case 'mp4':
      case 'avi':
      case 'mov': return Video;
      case 'sql':
      case 'js':
      case 'ts':
      case 'py': return Archive;
      case 'pptx':
      case 'docx': return FileText;
      default: return FileText;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'docx':
      case 'pptx': return 'from-red-500 to-pink-500';
      case 'fig':
      case 'psd': return 'from-purple-500 to-indigo-500';
      case 'jpg':
      case 'png':
      case 'gif': return 'from-green-500 to-emerald-500';
      case 'mp4':
      case 'avi':
      case 'mov': return 'from-blue-500 to-cyan-500';
      case 'sql':
      case 'js':
      case 'ts':
      case 'py': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatFileSize = (sizeString: string) => {
    // If it's already formatted (e.g., "2.4 MB"), return as is
    if (sizeString.includes('MB') || sizeString.includes('KB') || sizeString.includes('GB')) {
      return sizeString;
    }
    // If it's a number in bytes, format it
    const bytes = parseInt(sizeString);
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      await axios.delete(`/api/files/${fileId}`);
      fetchFiles(); // Refresh the list
    } catch (err) {
      console.error('Failed to delete file:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AuthenticatedNavbar currentPage="hub" />
      
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
              <h1 className="text-3xl font-bold text-white mb-2">Shared Hub</h1>
              <p className="text-gray-400">Central storage for all team files and resources</p>
            </div>
            <HolographicButton onClick={() => router.push('/hub/upload')}>
              <Upload className="w-4 h-4" />
              Upload Files
            </HolographicButton>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search files, descriptions, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="bg-slate-800">
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date" className="bg-slate-800">Sort by Date</option>
              <option value="name" className="bg-slate-800">Sort by Name</option>
              <option value="size" className="bg-slate-800">Sort by Size</option>
              <option value="downloads" className="bg-slate-800">Sort by Downloads</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white/20 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white/20 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Files Display */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={fetchFiles}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white"
            >
              Retry
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {files.map((file, index) => {
              const FileIcon = getFileIcon(file.type);
              
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-6 hover:bg-white/10 transition-colors cursor-pointer group"
                  onClick={() => router.push(`/file/${file.id}`)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getFileTypeColor(file.type)} flex items-center justify-center`}>
                      <FileIcon className="w-6 h-6 text-white" />
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <h3 className="text-white font-semibold mb-2 truncate" title={file.name}>
                    {file.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {file.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Size</span>
                      <span className="text-white">{file.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Downloads</span>
                      <span className="text-white">{file.downloadCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Uploaded</span>
                      <span className="text-white">{formatDate(file.uploadedAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {file.uploadedBy?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm">{file.uploadedBy?.name || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 rounded hover:bg-white/10">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 rounded hover:bg-white/10">
                        <Download className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {files.map((file, index) => {
              const FileIcon = getFileIcon(file.type);
              
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-card p-6 hover:bg-white/10 transition-colors cursor-pointer group"
                  onClick={() => router.push(`/file/${file.id}`)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getFileTypeColor(file.type)} flex items-center justify-center flex-shrink-0`}>
                      <FileIcon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {file.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">{formatFileSize(file.size)}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-400">{file.downloadCount} downloads</span>
                        </div>
                      </div>

                      <p className="text-gray-400 mb-3">{file.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {file.uploadedBy?.name?.charAt(0) || 'U'}
                              </span>
                            </div>
                            <span className="text-white text-sm font-medium">
                              {file.uploadedBy?.name || 'Unknown'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(file.uploadedAt)}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            {file.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-400">
                                {tag}
                              </span>
                            ))}
                            {file.tags.length > 3 && (
                              <span className="text-xs text-gray-500">+{file.tags.length - 3}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <Download className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <Share2 className="w-4 h-4 text-gray-400" />
                          </button>
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
        {files.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
              <Folder className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No files found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or upload new files</p>
            <HolographicButton onClick={() => router.push('/hub/upload')}>
              <Upload className="w-4 h-4" />
              Upload Files
            </HolographicButton>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hub;
