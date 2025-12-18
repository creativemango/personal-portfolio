import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { getPublishedBlogPosts } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
import { 
  Github, Twitter, Mail, Sparkles, 
  Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight,
  Search, Folder, Tag, ChevronDown 
} from 'lucide-react';

const BlogHome = () => {
  const { user } = useAuth();
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

  const categories = [
    { name: '技术', count: 12 },
    { name: '生活', count: 8 },
    { name: '读书', count: 5 },
    { name: '旅行', count: 3 }
  ];

  const tags = ['#SpringBoot', '#Java', '#微服务', '#前端', '#DevOps'];

  // 加载文章列表
  const loadBlogPosts = async (page = 1, searchKeyword = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getPublishedBlogPosts(page, pagination.size, searchKeyword);
      
      setBlogPosts(response.records || []);
      setPagination({
        page: response.page || 1,
        size: response.size || 10,
        total: response.total || 0,
        pages: response.pages || 0
      });
    } catch (err) {
      console.error('加载文章失败:', err);
      setError(err.message || '加载文章失败，请稍后重试');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadBlogPosts(1, keyword);
  }, []);

  // 处理分页变化
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      loadBlogPosts(newPage, keyword);
      window.scrollTo(0, 0); // 滚动到顶部
    }
  };

  // 处理搜索
  const handleSearch = (e) => {
    e.preventDefault();
    loadBlogPosts(1, keyword);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* 左侧主栏：文章列表 */}
        <div className="col-span-1 lg:col-span-8 space-y-10">
          
          {/* Hero Card */}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Hello, {user?.name || user?.login || '博主'} 👋</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {user?.bio || '全栈开发者，热爱开源与设计。这里记录我的代码、生活和一些奇思妙想。'}
              </p>
              <div className="flex justify-center md:justify-start gap-3">
                <a href={user?.html_url || "#"} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition"><Github className="w-5 h-5" /></a>
                <a href="#" className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-50 rounded-full transition"><Twitter className="w-5 h-5" /></a>
                <a href={`mailto:${user?.email || ''}`} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition"><Mail className="w-5 h-5" /></a>
              </div>
            </div>
          </div>

          {/* 文章列表 Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" /> 最新文章
            </h3>
            <div className="text-sm text-gray-500">共 {pagination.total} 篇</div>
          </div>

          {/* 文章列表 */}
          <div className="space-y-8">
            {loading ? (
              <div className="text-center py-20 text-gray-500">加载中...</div>
            ) : error ? (
              <div className="text-center py-20 text-red-500">{error}</div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-20 text-gray-500">暂无文章</div>
            ) : (
              blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col md:flex-row h-auto md:h-56">
                  {/* Placeholder for Cover Image */}
                  <div className="md:w-1/3 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                    <div className="text-gray-400 text-6xl">🖼️</div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-600 shadow-sm">
                      {post.category || '未分类'}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-6 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString('zh-CN') : ''}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                      {post.title}
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
                      <span className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 cursor-pointer">
                        阅读全文 <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* 分页器 */}
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
                第 {pagination.page} 页 / 共 {pagination.pages} 页
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

        {/* 右侧边栏 */}
        <div className="hidden lg:block col-span-4 space-y-8">
          
          {/* 搜索框 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4">搜索</h4>
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="输入关键词..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </form>
          </div>

          {/* 分类目录 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Folder className="w-4 h-4 text-primary-500" /> 分类
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

          {/* 热门标签 */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary-500" /> 标签云
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-gray-100 text-sm text-gray-600 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 订阅卡片 */}
          <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white text-center">
            <h4 className="font-bold text-lg mb-2">订阅更新</h4>
            <p className="text-primary-100 text-sm mb-4">每周精选文章，直接发送到你的邮箱。</p>
            <div className="space-y-2">
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50" />
              <button className="w-full bg-white text-primary-700 font-bold py-2 rounded-lg hover:bg-gray-50 transition">订阅</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogHome;
