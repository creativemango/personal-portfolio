import React from 'react';
import { 
  User, 
  Code, 
  Server, 
  Cloud, 
  Briefcase, 
  Camera, 
  Plane, 
  BookOpen, 
  PenTool, 
  Terminal,
  Database,
  Layout,
  Cpu,
  Coffee,
  Globe
} from 'lucide-react';

const About = () => {
  const skills = [
    {
      title: "后端开发",
      icon: <Server className="w-6 h-6 text-blue-500" />,
      items: ["Java / Spring Boot", "微服务架构", "RESTful API 设计", "数据库设计"]
    },
    {
      title: "前端开发",
      icon: <Layout className="w-6 h-6 text-purple-500" />,
      items: ["React / Vue.js", "TypeScript", "响应式设计", "性能优化"]
    },
    {
      title: "DevOps",
      icon: <Cloud className="w-6 h-6 text-green-500" />,
      items: ["Docker / Kubernetes", "CI/CD 流水线", "云服务部署", "监控和日志"]
    }
  ];

  const projects = [
    {
      title: "微服务电商平台",
      period: "2023年 - 至今",
      description: "设计和开发基于微服务架构的电商平台，包含用户服务、商品服务、订单服务和支付服务等模块。使用 Spring Cloud、Docker 和 Kubernetes 进行部署和管理。",
      tags: ["Spring Cloud", "K8s", "Docker"]
    },
    {
      title: "企业级内容管理系统",
      period: "2022年 - 2023年",
      description: "开发企业级内容管理系统，支持多租户、权限管理和内容发布。前端使用 React + TypeScript，后端使用 Spring Boot + MySQL。",
      tags: ["React", "Spring Boot", "MySQL"]
    }
  ];

  const interests = [
    { name: "技术博客写作", icon: <PenTool className="w-4 h-4" /> },
    { name: "开源项目贡献", icon: <Code className="w-4 h-4" /> },
    { name: "摄影", icon: <Camera className="w-4 h-4" /> },
    { name: "旅行", icon: <Plane className="w-4 h-4" /> },
    { name: "阅读", icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">关于我</span>
            <span className="block text-blue-600 text-2xl mt-4 font-medium">技术 • 生活 • 思考</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            欢迎来到我的个人作品集网站！这里是我分享技术、生活和思考的地方。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
              <div className="px-6 pb-8">
                <div className="relative -mt-16 mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                    <img 
                      src="/images/default-avatar.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {e.target.src = 'https://via.placeholder.com/150'}}
                    />
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">开发者</h2>
                  <p className="text-blue-600 font-medium">全栈工程师 & 架构师</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                    <span>专注于解决复杂问题</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-5 h-5 mr-3 text-gray-400" />
                    <span>乐于分享知识和经验</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Coffee className="w-5 h-5 mr-3 text-gray-400" />
                    <span>热爱探索新技术</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    兴趣爱好
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((item, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        <span className="mr-1.5">{item.icon}</span>
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">个人简介</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                我是一名热爱技术的开发者，专注于全栈开发和软件架构设计。
                喜欢探索新技术，解决复杂问题，并乐于分享知识和经验。
                我相信技术的力量可以改变世界，致力于构建高质量、高性能的软件系统。
              </p>
            </div>

            {/* Technical Skills */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center mb-8">
                <Terminal className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">技术专长</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      {skill.icon}
                      <h3 className="ml-3 font-bold text-gray-900">{skill.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {skill.items.map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-600 text-sm">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Experience */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center mb-8">
                <Database className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">项目经验</h2>
              </div>
              <div className="space-y-8">
                {projects.map((project, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-blue-100 last:mb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
                    <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full mt-2 sm:mt-0">
                        {project.period}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
