import React from 'react'
import { FileText, Eye, Pencil, Plus } from 'lucide-react'

const DashboardStats = ({ stats, onWriteClick }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">仪表盘</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">已发布文章</div>
            <div className="text-3xl font-bold text-gray-900">{stats?.published || 0}</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><FileText className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">总阅读量</div>
            <div className="text-3xl font-bold text-gray-900">{stats?.views || 0}</div>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-lg"><Eye className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">草稿</div>
            <div className="text-3xl font-bold text-gray-900">{stats?.drafts || 0}</div>
          </div>
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><Pencil className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">开始创作</h3>
        <p className="text-gray-500 mb-6">分享你的想法，记录你的旅程</p>
        <button 
          onClick={onWriteClick}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition"
        >
          <Plus className="w-5 h-5" /> 写文章
        </button>
      </div>
    </div>
  )
}

export default DashboardStats
