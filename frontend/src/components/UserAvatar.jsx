import React from 'react'

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg'
}

const UserAvatar = ({ src, name, size = 'sm', showName = false }) => {
  const initial = (name || 'U').charAt(0).toUpperCase()
  const cls = sizes[size] || sizes.sm
  const [failed, setFailed] = React.useState(false)
  const useImage = src && !failed
  return (
    <div className="flex items-center gap-3">
      <div className={`${cls} rounded-full border border-gray-200 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0`}>
        {useImage ? (
          <img
            src={src}
            alt={name || 'User'}
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="font-bold text-gray-600 dark:text-gray-200">{initial}</span>
        )}
      </div>
      {showName && (
        <span className="font-semibold text-gray-900 dark:text-white">{name || 'User'}</span>
      )}
    </div>
  )
}

export default UserAvatar
