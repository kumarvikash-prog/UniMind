import { useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

interface FileUploadProps {
  onUploadSuccess?: (files: any[]) => void;
  onUploadError?: (error: string) => void;
}

export const FileUpload = ({ onUploadSuccess, onUploadError }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      setFiles(prev => [...prev, ...Array.from(selectedFiles)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onUploadSuccess?.(response.data.files);
      setFiles([]);
    } catch (error: any) {
      console.error('Upload failed:', error);
      onUploadError?.(error.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver 
            ? 'border-blue-400 bg-blue-500/10' 
            : 'border-white/20 hover:border-white/40'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-white font-medium mb-2">Drop files here or click to browse</p>
        <p className="text-gray-400 text-sm mb-4">Supports all file types up to 100MB</p>
        
        <input
          type="file"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer transition-colors"
        >
          Choose Files
        </label>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h4 className="text-white font-medium">Selected Files:</h4>
          {files.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-white/10 rounded-lg p-3"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white text-sm font-medium">{file.name}</p>
                  <p className="text-gray-400 text-xs">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 rounded hover:bg-red-500/20 transition-colors"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </motion.div>
          ))}
          
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
          </button>
        </motion.div>
      )}
    </div>
  );
};
