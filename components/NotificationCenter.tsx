import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  FileText, 
  MessageSquare, 
  Clock, 
  Users,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useRealtimeUpdates } from '../hooks/useRealtimeUpdates';

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, removeNotification, clearNotifications } = useRealtimeUpdates();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'file': return FileText;
      case 'message': return MessageSquare;
      case 'task': return Clock;
      case 'contribution': return Users;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'file': return 'from-blue-500 to-cyan-500';
      case 'message': return 'from-green-500 to-emerald-500';
      case 'task': return 'from-purple-500 to-pink-500';
      case 'contribution': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <Bell className="w-5 h-5 text-white" />
        {notifications.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">
              {notifications.length > 9 ? '9+' : notifications.length}
            </span>
          </motion.div>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 glass-card rounded-lg shadow-lg py-2 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
              <h3 className="text-white font-semibold">Notifications</h3>
              <div className="flex items-center space-x-2">
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400 text-sm">No notifications</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-start space-x-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer group"
                        onClick={() => {
                          // Handle notification click
                          removeNotification(notification.id);
                        }}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getNotificationColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 transition-all"
                        >
                          <X className="w-3 h-3 text-gray-400" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
