import React from 'react'

const AuthLayout = ({ children, title, subtitle, icon: Icon }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary-100 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 rounded-full bg-purple-100 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 rounded-full bg-pink-100 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          {Icon && (
            <div className="mx-auto h-12 w-12 bg-primary-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg transform rotate-3">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  )
}

export default AuthLayout
