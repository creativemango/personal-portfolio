import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Check, Code, Database, Server, ArrowRight, Github } from 'lucide-react'

const Home = () => {
  const { user } = useAuth()
  
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Welcome Section */}
        <div className="text-center py-20 px-8 bg-white rounded-2xl shadow-sm border border-gray-100 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            This is where I share technology, life, and thoughts. Explore the art of code and record the footprints of growth.
          </p>
          
          {user ? (
            <div className="flex flex-col items-center">
              <p className="text-lg mb-6 font-medium text-gray-700">Welcome back, {user.name || user.login}!</p>
              <Link 
                to="/home" 
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Go to Blog Home <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                Start Your Journey
              </h3>
              <p className="text-gray-300 mb-8 relative z-10">
                Log in to access blog articles, post comments, and more creator features.
              </p>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center gap-2 w-full bg-white text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition relative z-10"
              >
                Login Now
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* About Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary-500 rounded-full"></span>
              About This Site
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This is a personal technical blog and portfolio website, sharing programming technology, project experience, and life insights.
              It uses a modern separation of frontend and backend architecture, aiming to provide a smooth user experience and efficient content management.
            </p>
          </div>

          {/* Tech Stack Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
              Tech Stack
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
                <Code className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-primary-500 transition-colors" />
                <h3 className="font-bold text-gray-900 mb-1">Frontend</h3>
                <p className="text-xs text-gray-500">React + Vite</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
                <Server className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-primary-500 transition-colors" />
                <h3 className="font-bold text-gray-900 mb-1">Backend</h3>
                <p className="text-xs text-gray-500">Spring Boot</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group">
                <Database className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-primary-500 transition-colors" />
                <h3 className="font-bold text-gray-900 mb-1">Database</h3>
                <p className="text-xs text-gray-500">H2 / MySQL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              'GitHub OAuth2 Login',
              'Responsive Design',
              'Blog Article Management',
              'User Profile Display',
              'RESTful API'
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <span className="font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
