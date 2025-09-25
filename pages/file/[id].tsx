import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft,
  Download,
  Eye,
  Share2,
  MessageSquare,
  Calendar,
  User,
  FileText,
  Image,
  Video,
  Archive,
  Grid,
  Trash2,
  Edit,
  Tag
} from "lucide-react";
import { AuthenticatedNavbar } from "../../components/AuthenticatedNavbar";
import { HolographicButton } from "../../components/HolographicButton";
import { RealtimeChat } from "../../components/RealtimeChat";
import axios from "axios";

const FileDetail = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
      return;
    }
    
    if (id) {
      fetchFile();
    }
  }, [session, status, router, id]);

  const fetchFile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/files/${id}`);
      setFile(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch file:', err);
      setError('Failed to load file');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`/api/files/${id}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleMessageSent = (message: any) => {
    // Handle message sent callback if needed
    console.log('Message sent:', message);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      await axios.delete(`/api/files/${id}`);
      router.push('/hub');
    } catch (err) {
      console.error('Failed to delete file:', err);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <AuthenticatedNavbar currentPage="hub" />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">File Not Found</h1>
            <p className="text-gray-400 mb-6">{error}</p>
            <HolographicButton onClick={() => router.push('/hub')}>
              <ArrowLeft className="w-4 h-4" />
              Back to Hub
            </HolographicButton>
          </div>
        </div>
      </div>
    );
  }

  if (!file) {
    return null;
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt': return FileText;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return Image;
      case 'mp4':
      case 'avi':
      case 'mov': return Video;
      case 'fig':
      case 'psd':
      case 'ai': return Grid;
      case 'js':
      case 'ts':
      case 'py':
      case 'sql': return Archive;
      default: return FileText;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'doc':
      case 'docx': return 'from-red-500 to-pink-500';
      case 'fig':
      case 'psd':
      case 'ai': return 'from-purple-500 to-indigo-500';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return 'from-green-500 to-emerald-500';
      case 'mp4':
      case 'avi':
      case 'mov': return 'from-blue-500 to-cyan-500';
      case 'js':
      case 'ts':
      case 'py':
      case 'sql': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const FileIcon = getFileIcon(file.type);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AuthenticatedNavbar currentPage="hub" />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
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
                onClick={() => router.push("/hub")}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{file.name}</h1>
                <p className="text-gray-400">File Details & Discussion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <HolographicButton onClick={handleDownload}>
                <Download className="w-4 h-4" />
                Download
              </HolographicButton>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                <Share2 className="w-4 h-4 text-white" />
              </button>
              <button 
                onClick={handleDelete}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center justify-center mb-6">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${getFileTypeColor(file.type)} flex items-center justify-center`}>
                  <FileIcon className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">{file.name}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white font-medium uppercase">{file.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Size</span>
                  <span className="text-white font-medium">{file.size}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="text-white font-medium capitalize">{file.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Downloads</span>
                  <span className="text-white font-medium">{file.downloadCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Uploaded</span>
                  <span className="text-white font-medium">{formatDate(file.uploadedAt)}</span>
                </div>
              </div>

              {file.description && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-white font-medium mb-2">Description</h4>
                  <p className="text-gray-400 text-sm">{file.description}</p>
                </div>
              )}

              {file.tags && file.tags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-white font-medium mb-3 flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {file.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Uploaded by
                </h4>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold">
                      {file.uploadedBy?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{file.uploadedBy?.name || 'Unknown'}</p>
                    <p className="text-gray-400 text-sm">{file.uploadedBy?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Real-time Chat Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="glass-card h-full flex flex-col">
              <RealtimeChat 
                fileId={id as string}
                roomType="file"
                onMessageSent={handleMessageSent}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FileDetail;