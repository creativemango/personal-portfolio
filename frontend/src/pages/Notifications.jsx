import React, { useEffect, useState } from 'react';
import { notificationService } from '../services/notificationService';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Heart, Clock, Check, ThumbsUp, Users, Mail, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserAvatar from '../components/UserAvatar';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [activeTab, setActiveTab] = useState('reviews'); // reviews, likes, followers, dm, system
  const { setUnreadNotifications } = useAuth();

  useEffect(() => {
    // Reset state when tab changes
    setNotifications([]);
    setPage(1);
    setHasMore(false);
    fetchNotifications(1);
  }, [activeTab]);

  useEffect(() => {
    if (page > 1) {
      fetchNotifications(page);
    }
  }, [page]);

  const fetchNotifications = async (currentPage) => {
    try {
      setLoading(true);
      // In a real app, pass the type/tab to the API
      const data = await notificationService.listNotifications(currentPage, 20);
      
      if (currentPage === 1) {
        setNotifications(data?.records || []);
      } else {
        setNotifications(prev => [...prev, ...(data?.records || [])]);
      }
      
      setHasMore(data.page * data.size < data.total);
    } catch (error) {
      console.error('Failed to load notifications', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
      const count = await notificationService.getUnreadCount();
      setUnreadNotifications(Number(count));
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const markAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadNotifications(0);
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    // Less than 24 hours
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (diff < 365 * 24 * 60 * 60 * 1000) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const tabs = [
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'likes', label: 'Likes', icon: ThumbsUp },
    { id: 'followers', label: 'Followers', icon: Users },
    { id: 'dm', label: 'DM', icon: Mail },
    { id: 'system', label: 'System', icon: Bell },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header & Tabs */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          {notifications?.some(n => !n.read) && (
            <button 
              onClick={markAllRead}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors relative ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden min-h-[400px]">
        {notifications?.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
            <Bell className="w-12 h-12 mb-4 opacity-20" />
            <p>No notifications in {tabs.find(t => t.id === activeTab)?.label}</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {notifications?.map((notification) => (
              <div 
                key={notification.id}
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  !notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <UserAvatar 
                      src={notification.senderAvatar} 
                      name={notification.senderName || 'System'} 
                      size="md" 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {notification.senderName || 'System'}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {notification.type === 'REPLY_TO_COMMENT' ? 'replied to you in' : 'commented on'}
                      </span>
                      {notification.relatedPostId && (
                        <Link 
                          to={`/post/${notification.relatedPostId}`}
                          className="font-medium text-gray-900 dark:text-white hover:text-primary-600 hover:underline truncate max-w-[200px]"
                        >
                          "Post Title"
                        </Link>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-base">
                      {notification.content}
                    </p>

                    {/* Quote Area (simulated for now) */}
                    <div className="pl-3 border-l-2 border-gray-200 dark:border-gray-600 my-3">
                      <Link 
                         to={`/post/${notification.relatedPostId}`}
                         className="text-gray-400 dark:text-gray-500 text-sm hover:text-primary-600 line-clamp-1"
                      >
                         Original comment or post content preview...
                      </Link>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-400">
                        {formatDate(notification.createdAt)}
                      </span>
                      
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                        Like
                      </button>
                      
                      <Link 
                        to={`/post/${notification.relatedPostId}`}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        Reply
                      </Link>
                    </div>
                  </div>

                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="flex-shrink-0 text-primary-600 hover:text-primary-700"
                      title="Mark as read"
                    >
                      <span className="block w-2 h-2 rounded-full bg-primary-600"></span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Loading & More... */}
      </div>
    </div>
  );
};

export default Notifications;
