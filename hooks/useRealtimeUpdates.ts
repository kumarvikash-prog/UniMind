import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';

export const useRealtimeUpdates = () => {
  const { socket, connected } = useSocket();
  const [contributions, setContributions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!socket || !connected) return;

    // Listen for new contributions
    const handleNewContribution = (contribution: any) => {
      setContributions(prev => [contribution, ...prev]);
      
      // Add notification
      setNotifications(prev => [{
        id: Date.now().toString(),
        type: 'contribution',
        message: `${contribution.user?.name} ${contribution.title}`,
        timestamp: new Date().toISOString(),
        data: contribution
      }, ...prev]);
    };

    // Listen for file activities
    const handleFileActivity = (data: any) => {
      setNotifications(prev => [{
        id: Date.now().toString(),
        type: 'file',
        message: `${data.user?.name} ${data.activity} on file`,
        timestamp: new Date().toISOString(),
        data
      }, ...prev]);
    };

    // Listen for task updates
    const handleTaskUpdate = (data: any) => {
      setNotifications(prev => [{
        id: Date.now().toString(),
        type: 'task',
        message: `${data.user?.name} updated task`,
        timestamp: new Date().toISOString(),
        data
      }, ...prev]);
    };

    socket.on('new-contribution', handleNewContribution);
    socket.on('file-activity-update', handleFileActivity);
    socket.on('task-update-notification', handleTaskUpdate);

    return () => {
      socket.off('new-contribution', handleNewContribution);
      socket.off('file-activity-update', handleFileActivity);
      socket.off('task-update-notification', handleTaskUpdate);
    };
  }, [socket, connected]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return {
    contributions,
    notifications,
    clearNotifications,
    removeNotification,
    connected
  };
};
