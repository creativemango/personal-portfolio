import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Search, Moon, Menu, X, LogOut } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/');
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-primary-700 transition-colors">
                B
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-primary-600 transition-colors">
                DailySpark
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-primary-600 transition">首页</Link>
            {user && (
              <>
                <Link to="/home" className="hover:text-primary-600 transition">博客</Link>
                <Link to="/creator-center" className="hover:text-primary-600 transition">创作者中心</Link>
              </>
            )}
            <Link to="/about" className="hover:text-primary-600 transition">关于</Link>
            <Link to="/contact" className="hover:text-primary-600 transition">联系</Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
              <Moon className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="hidden md:flex items-center gap-3 pl-2 border-l border-gray-200">
                <img
                  src={user.avatar_url || "/images/default-avatar.png"}
                  alt="用户头像"
                  className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                  onError={(e) => {
                    if (!e.target.src.includes('via.placeholder.com')) {
                      e.target.src = `https://via.placeholder.com/35x35/667eea/ffffff?text=${(user.login || user.username || 'U').charAt(0).toUpperCase()}`
                    }
                  }}
                />
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 group"
                  title="注销"
                >
                  <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="hidden md:block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition shadow-sm"
              >
                登录
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 top-16">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" className="block text-gray-600 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>首页</Link>
            {user && (
              <>
                <Link to="/home" className="block text-gray-600 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>博客</Link>
                <Link to="/creator-center" className="block text-gray-600 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>创作者中心</Link>
              </>
            )}
            <Link to="/about" className="block text-gray-600 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>关于</Link>
            <Link to="/contact" className="block text-gray-600 hover:text-primary-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>联系</Link>
            
            <div className="border-t border-gray-100 pt-3 mt-2">
              {user ? (
                <button 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full text-left text-red-600 font-medium py-2"
                >
                  注销
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="block w-full text-center bg-gray-900 text-white font-medium py-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  登录
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
