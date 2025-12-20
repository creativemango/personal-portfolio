import React from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, CheckCircle, AlertCircle, Pencil, Trash } from 'lucide-react'
import Pagination from '../Pagination'

const ArticleList = ({ 
  articles, 
  loading, 
  pagination, // { currentPage, totalPages, totalItems, onPageChange }
  onEdit, 
  onDelete,
  onCreateClick 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">文章管理</h2>
        <button 
          onClick={onCreateClick}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> 新建文章
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder="搜索文章..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
            <option>所有状态</option>
            <option>已发布</option>
            <option>草稿</option>
          </select>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">加载中...</div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-4">暂无文章</p>
            <button onClick={onCreateClick} className="text-primary-600 font-medium hover:underline">去写一篇</button>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-3">标题</th>
                <th className="px-6 py-3 w-32">状态</th>
                <th className="px-6 py-3 w-32">分类</th>
                <th className="px-6 py-3 w-40">日期</th>
                <th className="px-6 py-3 w-32 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition group">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <Link to={`/post/${article.id}`} target="_blank" className="hover:text-primary-600 hover:underline">
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {article.published ? (
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-100">
                        <CheckCircle className="w-3 h-3" /> 已发布
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-2.5 py-0.5 rounded-full text-xs font-medium border border-yellow-100">
                        <AlertCircle className="w-3 h-3" /> 草稿
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{article.category || '-'}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(article)} className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="编辑"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(article.id)} className="p-1 text-red-600 hover:bg-red-50 rounded" title="删除"><Trash className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {pagination.totalPages > 1 && (
        <Pagination 
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          totalItems={pagination.totalItems}
        />
      )}
    </div>
  )
}

export default ArticleList
