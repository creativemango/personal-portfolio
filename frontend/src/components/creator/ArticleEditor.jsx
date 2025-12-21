import React, { useState, useRef, useEffect } from 'react'
import { 
  Bold, Italic, Heading, Link as LinkIcon, Image, Code, 
  Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, BarChart,
  Send, Save, UploadCloud, Eye, EyeOff, Maximize, Minimize 
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import MermaidDiagram from '../MermaidDiagram'
import 'highlight.js/styles/github-dark.css'

const ArticleEditor = ({ initialData, onSave, isSaving }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Technology',
    tags: ''
  })
  const [showPreview, setShowPreview] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const contentTextareaRef = useRef(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        content: initialData.content || '',
        category: initialData.category || 'Technology',
        tags: initialData.tags ? (Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags) : ''
      })
    } else {
      setFormData({
        title: '',
        content: '',
        category: 'Technology',
        tags: ''
      })
    }
  }, [initialData])

  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  // Debounce history saving for typing
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only save if different from current history head
      if (historyIndex === -1 || history[historyIndex] !== formData.content) {
        saveToHistory(formData.content)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [formData.content])

  const saveToHistory = (newContent) => {
    // If empty history, just push
    if (historyIndex === -1) {
      setHistory([newContent])
      setHistoryIndex(0)
      return
    }

    // If no change, don't push
    if (history[historyIndex] === newContent) return

    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newContent)
    
    // Limit history size
    if (newHistory.length > 50) {
      newHistory.shift()
    }
    
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setFormData(prev => ({ ...prev, content: history[newIndex] }))
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setFormData(prev => ({ ...prev, content: history[newIndex] }))
    }
  }

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault()
      if (e.shiftKey) {
        handleRedo()
      } else {
        handleUndo()
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const insertMarkdown = (prefix, suffix = '') => {
    const textarea = contentTextareaRef.current
    if (!textarea) return

    // Save current state before modification if strictly necessary, 
    // but the debounce usually captures the "before" state if user paused.
    // To be safe for toolbar actions, we can force save current state if it differs from history head.
    if (historyIndex !== -1 && history[historyIndex] !== formData.content) {
        // This handles the case where user typed but didn't wait for debounce
        // We push the 'before' state to history immediately
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(formData.content)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = formData.content
    const before = text.substring(0, start)
    const selection = text.substring(start, end)
    const after = text.substring(end)

    const newContent = before + prefix + selection + suffix + after
    
    setFormData(prev => ({ ...prev, content: newContent }))
    
    // We don't manually push newContent here; we let the useEffect debounce handle it 
    // OR we push it immediately to ensure button clicks are discrete steps.
    // Let's push immediately for toolbar actions to make them distinct undo steps.
    // But we need to wait for state update... actually we have newContent variable.
    // We can't update history state twice in one render cycle easily if we just updated it above.
    // Let's rely on the useEffect for the "after" state, or we can use a ref to bypass debounce?
    // The useEffect has 1000ms delay. If we rely on it, the "Bold" action won't be in history for 1s.
    // If user types immediately after bold, it might merge.
    // Ideally, toolbar actions should be instant save points.
    
    // Let's rely on useEffect for simplicity for now, as 1s is short enough.
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  const handleSaveClick = (isPublish) => {
    if (!formData.title || !formData.content) {
      alert('Title and content cannot be empty')
      return
    }
    onSave(formData, isPublish)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50/50 -m-6 p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Writing Studio</h2>
          <p className="text-sm text-gray-500 mt-1">Create and share your thoughts with the world</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 h-full">
        {/* Main Editor Area */}
        <div className="lg:col-span-9 flex flex-col gap-6 h-full">
          {/* Title Input */}
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter article title..." 
            className="w-full text-4xl font-extrabold text-gray-900 placeholder-gray-300 bg-transparent border-none focus:ring-0 focus:outline-none px-2 transition-all"
          />
          
          <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-gray-100 p-6 h-screen' : 'flex-1 min-h-[600px]'} flex flex-col lg:flex-row gap-6 transition-all duration-300`}>
            
            {/* Editor Container */}
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden flex flex-col flex-1 ${showPreview ? 'lg:w-1/2' : 'w-full'} transition-all duration-300 group hover:shadow-md hover:border-gray-300/80`}>
              {/* Toolbar */}
              <div className="border-b border-gray-100 p-3 flex gap-2 bg-white flex-wrap items-center justify-between sticky top-0 z-20">
                <div className="flex gap-1 flex-wrap items-center">
                  {/* Basic Formatting */}
                  <div className="flex bg-gray-50 rounded-lg p-1 gap-0.5">
                    <button onClick={() => insertMarkdown('**', '**')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Bold"><Bold className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('*', '*')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Italic"><Italic className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('~~', '~~')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Strikethrough"><Strikethrough className="w-4 h-4" /></button>
                  </div>
                  
                  {/* Headings & Lists */}
                  <div className="flex bg-gray-50 rounded-lg p-1 gap-0.5">
                    <button onClick={() => insertMarkdown('### ')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Heading"><Heading className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('- ')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Unordered List"><List className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('1. ')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Ordered List"><ListOrdered className="w-4 h-4" /></button>
                  </div>

                  {/* Alignment */}
                  <div className="flex bg-gray-50 rounded-lg p-1 gap-0.5">
                    <button onClick={() => insertMarkdown('<div align="left">\n\n', '\n\n</div>')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Align Left"><AlignLeft className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('<div align="center">\n\n', '\n\n</div>')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Align Center"><AlignCenter className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('<div align="right">\n\n', '\n\n</div>')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Align Right"><AlignRight className="w-4 h-4" /></button>
                  </div>

                  {/* Insertions */}
                  <div className="flex bg-gray-50 rounded-lg p-1 gap-0.5">
                    <button onClick={() => insertMarkdown('[', '](url)')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Link"><LinkIcon className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('![alt](', ')')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Image"><Image className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('```\n', '\n```')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Code Block"><Code className="w-4 h-4" /></button>
                    <button onClick={() => insertMarkdown('```mermaid\ngraph TD;\n    A-->B;\n', '```')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Mermaid Chart"><BarChart className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-6 w-px bg-gray-200"></div>
                  <button 
                    onClick={() => setShowPreview(!showPreview)} 
                    className={`p-2 rounded-lg text-gray-600 flex items-center gap-2 text-xs font-medium transition-all ${showPreview ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-100'}`}
                    title={showPreview ? "Hide Preview" : "Show Preview"}
                  >
                    {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span className="hidden sm:inline">{showPreview ? 'Hide Preview' : 'Preview'}</span>
                  </button>
                  
                  <button 
                    onClick={() => setIsFullScreen(!isFullScreen)} 
                    className={`p-2 rounded-lg text-gray-600 flex items-center gap-2 text-xs font-medium transition-all ${isFullScreen ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100'}`}
                    title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                  >
                    {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <textarea 
                ref={contentTextareaRef}
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 p-6 focus:outline-none resize-none font-mono text-gray-800 text-base leading-relaxed selection:bg-primary-100 selection:text-primary-900" 
                placeholder="Start writing your story..."
              />
              <div className="bg-gray-50 px-4 py-2 text-xs text-gray-400 border-t border-gray-100 flex justify-between">
                <span>Markdown Supported</span>
                <span>{formData.content.length} chars</span>
              </div>
            </div>

            {/* Preview Container */}
            {showPreview && (
              <div className="bg-white border border-gray-200/60 rounded-2xl shadow-sm overflow-auto flex-1 lg:w-1/2 p-8 prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-img:rounded-2xl prose-img:shadow-md">
                {formData.content ? (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                      pre: ({children, ...props}) => {
                        const hasMermaid = React.Children.toArray(children).some(child => 
                          React.isValidElement(child) && 
                          child.props.className && 
                          child.props.className.includes('mermaid')
                        );
                        if (hasMermaid) {
                          return <div className="my-6">{children}</div>;
                        }
                        return <pre {...props} className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-6 my-6">{children}</pre>;
                      },
                      code({node, inline, className, children, ...props}) {
                        const isMermaid = !inline && className && className.includes('mermaid');
                        if (isMermaid) {
                          return <MermaidDiagram code={String(children).replace(/\n$/, '')} />
                        }
                        return !inline ? (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        ) : (
                          <code className="bg-gray-100 text-primary-700 px-1.5 py-0.5 rounded font-mono text-sm border border-gray-200" {...props}>
                            {children}
                          </code>
                        )
                      },
                      blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-primary-500 bg-primary-50/30 pl-6 py-4 rounded-r-xl italic text-gray-700 my-6">
                          {children}
                        </blockquote>
                      )
                    }}
                  >
                    {formData.content}
                  </ReactMarkdown>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-300">
                    <Eye className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-sm font-medium">Preview will appear here</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-3 space-y-6">
          {/* Publish Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/60 sticky top-6">
            <h4 className="font-bold text-gray-900 mb-6 text-xs uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
              Publishing
            </h4>
            <div className="space-y-3">
              <button 
                onClick={() => handleSaveClick(true)}
                disabled={isSaving}
                className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSaving ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <Send className="w-4 h-4" />}
                Publish Now
              </button>
              <button 
                onClick={() => handleSaveClick(false)}
                disabled={isSaving}
                className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> Save Draft
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Category</label>
                <div className="relative">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Technology">Tech</option>
                    <option value="Life">Life</option>
                    <option value="Reading">Reading</option>
                    <option value="Travel">Travel</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tags</label>
                <input 
                  type="text" 
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all placeholder-gray-400" 
                  placeholder="React, Design, Tutorial..." 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Cover Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-primary-400 hover:text-primary-500 transition-all group">
                  <UploadCloud className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">Upload Cover</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleEditor
