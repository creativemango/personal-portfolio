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
  
  // Use visitor avatar as fallback instead of just failing
  const handleError = () => {
    if (src !== '/images/visitor-avatar.png') {
      // If the image fails and it's not already the visitor avatar, try the visitor avatar
      // Note: This assumes the visitor avatar is always available.
      // However, we should be careful about infinite loops if visitor avatar also fails.
      // Ideally, the caller should provide a valid fallback or we just show initials.
      setFailed(true) 
    }
  }

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
          // If image fails or no src, check if it's admin to show default-avatar or visitor-avatar
          // But here we might just want to show the visitor avatar image instead of initials?
          // The requirement says "visitor uses visitor-avatar.png".
          // If src is missing, it implies we should fallback.
          <img 
            src={name === 'admin' ? '/images/default-avatar.png' : '/images/visitor-avatar.png'}
            alt={name || 'User'}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If even the fallback fails, hide image and show initials (handled by parent logic or CSS?)
              // Actually, if this fails, we render the initials below
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextSibling.style.display = 'block'
            }} 
          />
        )}
        <span className="hidden font-bold text-gray-600 dark:text-gray-200">{initial}</span>
      </div>
      {showName && (
        <span className="font-semibold text-gray-900 dark:text-white">{name || 'User'}</span>
      )}
    </div>
  )
}

export default UserAvatar
