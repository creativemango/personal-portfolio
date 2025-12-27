import React from 'react'

const ConfirmDialog = ({ open, title, message, confirmText, cancelText, onConfirm, onCancel }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 w-full max-w-md mx-4">
        <div className="p-6">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{title || '确认'}</div>
          <div className="mt-3 text-gray-600 dark:text-gray-300">{message || ''}</div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              onClick={onCancel}
            >
              {cancelText || '取消'}
            </button>
            <button
              className="px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
              onClick={onConfirm}
            >
              {confirmText || '删除'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
