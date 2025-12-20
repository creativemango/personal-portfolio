import React from 'react'
import { Check, X } from 'lucide-react'

const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  icon: Icon,
  required = false,
  status = null, // null, 'loading', 'success', 'error'
  statusMessage = null
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {Icon && <Icon className="h-5 w-5 text-gray-400" />}
        </div>
        <input
          name={name}
          type={type}
          required={required}
          className={`appearance-none block w-full pl-10 pr-3 py-2.5 border ${
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
          } rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm transition-colors`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        
        {/* Status Icons */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {status === 'loading' && <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full"></div>}
          {status === 'success' && <Check className="h-5 w-5 text-green-500" />}
          {status === 'error' && <X className="h-5 w-5 text-red-500" />}
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {statusMessage && !error && <p className="mt-1 text-xs text-gray-500">{statusMessage}</p>}
    </div>
  )
}

export default FormInput
