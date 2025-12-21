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
      title: "Backend Development",
      icon: <Server className="w-6 h-6 text-blue-500" />,
      items: ["Java / Spring Boot", "Microservices Architecture", "RESTful API Design", "Database Design"]
    },
    {
      title: "Frontend Development",
      icon: <Layout className="w-6 h-6 text-purple-500" />,
      items: ["React / Vue.js", "TypeScript", "Responsive Design", "Performance Optimization"]
    },
    {
      title: "DevOps",
      icon: <Cloud className="w-6 h-6 text-green-500" />,
      items: ["Docker / Kubernetes", "CI/CD Pipelines", "Cloud Deployment", "Monitoring & Logging"]
    }
  ];

  const projects = [
    {
      title: "Microservices E-commerce Platform",
      period: "2023 - Present",
      description: "Designed and developed a microservices-based e-commerce platform, including user, product, order, and payment services. Deployed and managed using Spring Cloud, Docker, and Kubernetes.",
      tags: ["Spring Cloud", "K8s", "Docker"]
    },
    {
      title: "Enterprise CMS",
      period: "2022 - 2023",
      description: "Developed an enterprise content management system supporting multi-tenancy, permission management, and content publishing. Frontend using React + TypeScript, Backend using Spring Boot + MySQL.",
      tags: ["React", "Spring Boot", "MySQL"]
    }
  ];

  const interests = [
    { name: "Tech Blogging", icon: <PenTool className="w-4 h-4" /> },
    { name: "Open Source", icon: <Code className="w-4 h-4" /> },
    { name: "Photography", icon: <Camera className="w-4 h-4" /> },
    { name: "Traveling", icon: <Plane className="w-4 h-4" /> },
    { name: "Reading", icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">About Me</span>
            <span className="block text-blue-600 text-2xl mt-4 font-medium">Technology • Life • Thoughts</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Welcome to my personal portfolio! This is where I share technology, life, and thoughts.
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
                  <h2 className="text-2xl font-bold text-gray-900">Developer</h2>
                  <p className="text-blue-600 font-medium">Full Stack Engineer & Architect</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="w-5 h-5 mr-3 text-gray-400" />
                    <span>Focused on solving complex problems</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-5 h-5 mr-3 text-gray-400" />
                    <span>Passionate about sharing knowledge</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Coffee className="w-5 h-5 mr-3 text-gray-400" />
                    <span>Love exploring new technologies</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Hobbies
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
                <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                I am a developer passionate about technology, focusing on full-stack development and software architecture design.
                I like exploring new technologies, solving complex problems, and sharing knowledge and experience.
                I believe in the power of technology to change the world and am dedicated to building high-quality, high-performance software systems.
              </p>
            </div>

            {/* Technical Skills */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center mb-8">
                <Terminal className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Technical Expertise</h2>
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
                <h2 className="text-2xl font-bold text-gray-900">Project Experience</h2>
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
