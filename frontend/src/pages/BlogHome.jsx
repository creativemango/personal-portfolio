import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { getPublishedBlogPosts } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight,
  Search, Folder, Tag, ChevronDown 
} from 'lucide-react';

const BlogHome = () => {
  const { user } = useAuth();
  const isAdmin = user && user.role === 'ADMIN';
  const [blogPosts, setBlogPosts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    pages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');

  const [categories, setCategories] = useState([]);

  const [tagsCloud, setTagsCloud] = useState([]);

  // Load blog posts
  const loadBlogPosts = async (page = 1, searchKeyword = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getPublishedBlogPosts(page, pagination.size, searchKeyword);
      
      setBlogPosts(response.records || []);
      const map = new Map();
      (response.records || []).forEach((p) => {
        const c = p.category || 'Uncategorized';
        map.set(c, (map.get(c) || 0) + 1);
      });
      const cats = Array.from(map.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
      setCategories(cats);
      const tagMap = new Map();
      (response.records || []).forEach((p) => {
        let t = p.tags;
        if (!t) return;
        if (Array.isArray(t)) {
          t.forEach(tag => {
            const key = String(tag).trim();
            if (!key) return;
            tagMap.set(key, (tagMap.get(key) || 0) + 1);
          });
        } else if (typeof t === 'string') {
          t.split(',').map(s => s.trim()).filter(Boolean).forEach(tag => {
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
          });
        }
      });
      const tagList = Array.from(tagMap.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 20);
      setTagsCloud(tagList);
      setPagination({
        page: response.page || 1,
        size: response.size || 10,
        total: response.total || 0,
        pages: response.pages || 0
      });
    } catch (err) {
      console.error('Failed to load articles:', err);
      setError(err.message || 'Failed to load articles, please try again later');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadBlogPosts(1, keyword);
  }, []);

  // Helper to get cover image URL
  const getCoverImageUrl = (url) => {
    if (!url) return '/images/default_article_cover.png'
    if (url.startsWith('data:') || url.startsWith('http') || url.startsWith('/')) {
      return url
    }
    return `/uploads/${url}`
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      loadBlogPosts(newPage, keyword);
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    loadBlogPosts(1, keyword);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Main Column: Article List */}
        <div className="col-span-1 lg:col-span-8 space-y-10">
          
          {isAdmin && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 p-1">
                  <img 
                    src={user?.avatar_url || "/images/default-avatar.png"} 
                    alt="Avatar" 
                    className="w-full h-full rounded-full bg-white border-2 border-white object-cover"
                    onError={(e) => {
                      e.target.src = '/images/default-avatar.png'
                    }}
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Hello, {user?.name || user?.login || 'Blogger'} 👋</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {user?.bio || 'Full Stack Developer, loves open source and design. Recording my code, life and some whimsical ideas here.'}
                </p>
              </div>
            </div>
          )}

          {/* Article List Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" /> Latest Articles
            </h3>
            <div className="text-sm text-gray-500">Total {pagination.total} posts</div>
          </div>

          {/* Article List */}
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-20 text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center py-20 text-red-500">{error}</div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-20 text-gray-500">No articles found</div>
            ) : (
              blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col md:flex-row h-auto md:h-56">
                  {/* Cover Image */}
                  <div className="md:w-1/3 bg-gray-200 relative overflow-hidden">
                    <img 
                      src={getCoverImageUrl(post.coverFilePath)} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default_article_cover.png'
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-600 shadow-sm">
                      {post.category || 'Uncategorized'}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-6 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US') : ''}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 flex-1">
                      {post.summary || post.content?.substring(0, 150) + '...'}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img 
                          src={user?.avatar_url || "/images/default-avatar.png"} 
                          className="w-6 h-6 rounded-full border border-gray-200" 
                          alt="Author"
                        />
                        <span className="text-xs font-medium text-gray-700">{user?.name || user?.login || 'Admin'}</span>
                      </div>
                      <Link to={`/post/${post.id}`} className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 cursor-pointer">
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-8">
              <button 
                className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Simple Pagination Logic for Demo */}
              <span className="text-sm font-medium text-gray-700">
                Page {pagination.page} of {pagination.pages}
              </span>

              <button 
                className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block col-span-4 space-y-8">
          
          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4">Search</h4>
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Enter keywords..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </form>
          </div>

          {isAdmin && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Folder className="w-4 h-4 text-primary-500" /> Categories
              </h4>
              <ul className="space-y-3">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <a href="#" className="flex justify-between items-center text-gray-600 hover:text-primary-600 group transition">
                      <span>{cat.name}</span> 
                      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full group-hover:bg-primary-50 group-hover:text-primary-600 transition">{cat.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isAdmin && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary-500" /> Tags Cloud
              </h4>
              <div className="flex flex-wrap gap-2">
                {tagsCloud.length > 0 ? tagsCloud.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition cursor-pointer"
                  >
                    #{tag.name} <span className="ml-1 text-gray-400">({tag.count})</span>
                  </span>
                )) : (
                  <span className="text-gray-400 text-sm italic">No tags</span>
                )}
              </div>
            </div>
          )}

          

        </div>
      </div>
    </div>
  );
};

export default BlogHome;
