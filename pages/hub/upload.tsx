import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  ArrowLeft,
  FileText,
  Image,
  Video,
  Archive,
  Grid,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { AuthenticatedNavbar } from "../../components/AuthenticatedNavbar";
import { HolographicButton } from "../../components/HolographicButton";
import { FileUpload } from "../../components/FileUpload";
import axios from "axios";

const FileUploadPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
      return;
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

  const handleUploadSuccess = (files: any[]) => {
    setUploadedFiles(files);
    setUploadSuccess(true);
    setUploadError("");
    
    // Redirect to hub after 2 seconds
    setTimeout(() => {
      router.push("/hub");
    }, 2000);
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    setUploadSuccess(false);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AuthenticatedNavbar currentPage="hub" />
      
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
                onClick={() => router.push("/hub")}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Upload Files</h1>
                <p className="text-gray-400">Share files with your team</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upload Success Message */}
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <h3 className="text-green-400 font-semibold">Upload Successful!</h3>
                <p className="text-green-300 text-sm">
                  {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''} uploaded successfully. 
                  Redirecting to Hub...
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Upload Error Message */}
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="text-red-400 font-semibold">Upload Failed</h3>
                <p className="text-red-300 text-sm">{uploadError}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Upload Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8"
        >
          <FileUpload 
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
        </motion.div>

        {/* Uploaded Files Preview */}
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Uploaded Files</h3>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => {
                const FileIcon = getFileIcon(file.type);
                
                return (
                  <motion.div
                    key={file._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-4 flex items-center space-x-4"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getFileTypeColor(file.type)} flex items-center justify-center`}>
                      <FileIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{file.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {file.size} • {file.category} • Uploaded by {file.uploadedBy?.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 text-sm font-medium">✓ Uploaded</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Upload Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Upload Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div>
              <h4 className="text-white font-medium mb-2">Supported File Types</h4>
              <ul className="space-y-1">
                <li>• Documents: PDF, DOC, DOCX, TXT</li>
                <li>• Images: JPG, PNG, GIF, SVG</li>
                <li>• Videos: MP4, AVI, MOV</li>
                <li>• Design: FIG, PSD, AI, Sketch</li>
                <li>• Code: JS, TS, PY, SQL, HTML, CSS</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">File Limits</h4>
              <ul className="space-y-1">
                <li>• Maximum file size: 100MB</li>
                <li>• Multiple files supported</li>
                <li>• Drag & drop enabled</li>
                <li>• Automatic categorization</li>
                <li>• Team collaboration ready</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FileUploadPage;
