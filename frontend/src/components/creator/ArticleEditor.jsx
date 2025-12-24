import React, { useState, useRef, useEffect } from 'react'
import { 
  Bold, Italic, Heading, Link as LinkIcon, Image, Code, 
  Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, BarChart, Table,
  Send, Save, UploadCloud, Eye, EyeOff, Maximize, Minimize, ChevronDown, Settings, X, Clock
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import MermaidDiagram from '../MermaidDiagram'
import 'highlight.js/styles/github-dark.css'

const CHART_TEMPLATES = [
  { label: 'Flowchart', code: 'graph TD;\n    A-->B;\n    A-->C;\n    B-->D;\n    C-->D;' },
  { label: 'Sequence', code: 'sequenceDiagram\n    participant Alice\n    participant Bob\n    Alice->>John: Hello John, how are you?\n    loop Healthcheck\n        John->>John: Fight against hypochondria\n    end\n    Note right of John: Rational thoughts <br/>prevail!\n    John-->>Alice: Great!' },
  { label: 'Class', code: 'classDiagram\n    Animal <|-- Duck\n    Animal <|-- Fish\n    Animal <|-- Zebra\n    Animal : +int age\n    Animal : +String gender\n    Animal: +isMammal()\n    Animal: +mate()' },
  { label: 'State', code: 'stateDiagram-v2\n    [*] --> Still\n    Still --> [*]\n    Still --> Moving\n    Moving --> Still\n    Moving --> Crash\n    Crash --> [*]' },
  { label: 'Gantt', code: 'gantt\n    title A Gantt Diagram\n    dateFormat  YYYY-MM-DD\n    section Section\n    A task           :a1, 2014-01-01, 30d\n    Another task     :after a1  , 20d\n    section Another\n    Task in sec      :2014-01-12  , 12d\n    another task      : 24d' },
  { label: 'Pie', code: 'pie title Pets adopted by volunteers\n    "Dogs" : 386\n    "Cats" : 85\n    "Rats" : 15' },
  { label: 'ER Diagram', code: 'erDiagram\n    CUSTOMER ||--o{ ORDER : places\n    ORDER ||--|{ LINE-ITEM : contains\n    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses' },
  { label: 'Mindmap', code: 'mindmap\n  root((mindmap))\n    Origins\n      Long history\n      ::icon(fa fa-book)\n      Popularisation\n        British popular psychology author Tony Buzan\n    Research\n      On effectiveness\n      and features\n      On Automatic creation\n        Uses\n            Creative techniques\n            Strategic planning\n            Argument mapping' }
]

const ArticleEditor = ({ initialData, onSave, isSaving, autoSaveEnabled = true, autoSaveInterval = 30000 }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Technology',
    tags: '',
    coverFilePath: null
  })
  const [showPreview, setShowPreview] = useState(true)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showChartMenu, setShowChartMenu] = useState(false)
  const [showTableMenu, setShowTableMenu] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [lastAutoSave, setLastAutoSave] = useState(null)
  const [tableDims, setTableDims] = useState({ rows: 0, cols: 0 })
  const [prevArticleId, setPrevArticleId] = useState(null)
  const contentTextareaRef = useRef(null)
  const fileInputRef = useRef(null)
  const lastSavedContentRef = useRef('')
  const currentContentRef = useRef('')

  // Keep current content ref updated for interval
  useEffect(() => {
    currentContentRef.current = formData.content
  }, [formData.content])

  // Auto-save Effect
  useEffect(() => {
    if (!autoSaveEnabled) return

    const timer = setInterval(() => {
      // Check if content has changed since last save
      if (currentContentRef.current && currentContentRef.current !== lastSavedContentRef.current) {
        handleAutoSave()
      }
    }, autoSaveInterval)

    return () => clearInterval(timer)
  }, [autoSaveEnabled, autoSaveInterval])

  const getCoverImageUrl = (url) => {
    if (!url) return null
    if (url.startsWith('data:') || url.startsWith('http')) {
      return url
    }
    return `/uploads/${url}`
  }

  const handleAutoSave = () => {
    // Save to LocalStorage instead of API
    const draftKey = initialData?.id ? `draft-${initialData.id}` : 'draft-new'
    const dataToSave = {
      ...formData,
      lastModified: new Date().toISOString()
    }
    
    try {
      localStorage.setItem(draftKey, JSON.stringify(dataToSave))
      setLastAutoSave(new Date())
      lastSavedContentRef.current = formData.content
    } catch (error) {
      console.warn('Local auto-save failed:', error)
    }
  }

  // Load from LocalStorage on mount
  useEffect(() => {
    // If we are creating a new article (no initialData)
    if (!initialData) {
      const savedNewDraft = localStorage.getItem('draft-new')
      if (savedNewDraft) {
        try {
          const parsed = JSON.parse(savedNewDraft)
          // Only restore if user hasn't typed anything yet or it's a fresh mount
          if (!formData.content && !formData.title) {
            setFormData(prev => ({
              ...prev,
              title: parsed.title || '',
              content: parsed.content || '',
              category: parsed.category || 'Technology',
              tags: parsed.tags || '',
              coverFilePath: parsed.coverFilePath || null
            }))
            lastSavedContentRef.current = parsed.content || ''
            setLastAutoSave(new Date(parsed.lastModified))
          }
        } catch (e) {
          console.error('Failed to parse local draft', e)
        }
      }
    } 
    // If we are editing an existing article
    else {
      const savedDraft = localStorage.getItem(`draft-${initialData.id}`)
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft)
          
          if (parsed.content !== initialData.content) {
             setFormData(prev => ({
              ...prev,
              title: parsed.title || initialData.title,
              content: parsed.content || initialData.content,
              category: parsed.category || initialData.category,
              tags: parsed.tags || initialData.tags,
              coverFilePath: parsed.coverFilePath || initialData.coverFilePath
            }))
            lastSavedContentRef.current = parsed.content || ''
            setLastAutoSave(new Date(parsed.lastModified))
          }
        } catch (e) {
          console.error('Failed to parse local draft', e)
        }
      } else {
        // No local draft, just load from initialData
        setFormData({
          title: initialData.title || '',
          content: initialData.content || '',
          category: initialData.category || 'Technology',
          tags: initialData.tags ? (Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags) : '',
          coverFilePath: initialData.coverFilePath || null
        })
        lastSavedContentRef.current = initialData.content || ''
      }
    }
  }, [initialData])

  useEffect(() => {
    // If initialData is null, it means we are in "Create New" mode
    if (!initialData) {
      // Only reset if we weren't already in "Create New" mode (prevId was not null)
      // This prevents wiping if we are just starting
      if (prevArticleId !== null) {
        setFormData({
          title: '',
          content: '',
          category: 'Technology',
          tags: '',
          coverFilePath: null
        })
        setPrevArticleId(null)
        lastSavedContentRef.current = ''
      }
      return
    }

    // If initialData exists, check if it's a different article than what we are tracking
    if (initialData.id !== prevArticleId) {
      // Standard Case: Loading a different article from backend
      // Note: We handled the initial load logic in the previous useEffect for local storage restoration
      // This part mainly handles updates if the ID changes during session
      setPrevArticleId(initialData.id)
      
      // Only reset form data if we DIDN'T just restore from local storage in the other effect
      // The other effect runs first or concurrently. 
      // Actually, this effect might conflict with the local storage restoration one.
      // Let's rely on the first useEffect to handle ALL data loading logic.
      // We will remove the redundant setFormData here and just track the ID.
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
    }, 500)
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
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  // Clear local storage on successful manual save/publish
  const handleSaveClick = (isPublish) => {
    if (!formData.title || !formData.content) {
      alert('Title and content cannot be empty')
      return
    }
    onSave(formData, isPublish)
    lastSavedContentRef.current = formData.content
    
    // Clear the local draft because we just synced with backend
    const draftKey = initialData?.id ? `draft-${initialData.id}` : 'draft-new'
    localStorage.removeItem(draftKey)
    setLastAutoSave(null) // Reset auto-save indicator since it's now fully saved
  }

  const insertTable = (rows, cols) => {
    let header = '|';
    let separator = '|';
    
    for (let c = 0; c < cols; c++) {
      header += ` Header ${c + 1} |`;
      separator += ' --- |';
    }
    
    let body = '';
    for (let r = 0; r < rows; r++) {
      body += '|';
      for (let c = 0; c < cols; c++) {
        body += ` Cell ${r + 1}-${c + 1} |`;
      }
      body += '\n';
    }
    
    const tableMarkdown = `${header}\n${separator}\n${body}`;
    insertMarkdown(tableMarkdown, '\n');
    setShowTableMenu(false);
    setTableDims({ rows: 0, cols: 0 });
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit')
      e.target.value = ''
      return
    }

    // Create a preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData(prev => ({ 
        ...prev, 
        coverFilePath: reader.result,
        coverFile: file 
      }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50/50 p-6">
      <div className="flex flex-col gap-6 h-full">
        <div className="flex justify-between items-start gap-4">
          {/* Title Input */}
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter article title..." 
            className="flex-1 text-2xl font-extrabold text-gray-900 placeholder-gray-300 bg-transparent border-none focus:ring-0 focus:outline-none px-2 transition-all"
          />
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
              {isSaving && autoSaveEnabled && (
                <div className="text-xs text-gray-400 hidden lg:flex items-center gap-1 mr-2 animate-pulse">
                  <Clock className="w-3 h-3" />
                  <span>Saving...</span>
                </div>
              )}
              <button
                onClick={() => handleSaveClick(false)}
                disabled={isSaving}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> <span className="hidden sm:inline">Draft</span>
              </button>
              <button 
                onClick={() => setShowPublishModal(true)}
                disabled={isSaving}
                className="px-4 py-2 bg-gray-900 text-white font-bold rounded-xl hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md flex items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSaving ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Publish</span>
              </button>
          </div>
        </div>
        
        {/* Publish Modal */}
        {showPublishModal && (
          <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Publish Article</h3>
                    <p className="text-sm text-gray-500 mt-1">Review details before publishing</p>
                  </div>
                  <button onClick={() => setShowPublishModal(false)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"><X className="w-5 h-5"/></button>
               </div>
               <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Category</label>
                    <div className="relative">
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl p-4 text-base font-medium text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Life">Life</option>
                        <option value="Reading">Reading</option>
                        <option value="Travel">Travel</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ChevronDown className="w-5 h-5" />
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
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-base font-medium text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all placeholder-gray-400" 
                      placeholder="React, Design, Tutorial..." 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Cover Image</label>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-200 rounded-xl h-32 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-primary-400 hover:text-primary-500 transition-all group overflow-hidden relative"
                    >
                      {formData.coverFilePath ? (
                        <>
                          <img src={getCoverImageUrl(formData.coverFilePath)} alt="Cover" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-medium text-sm">Change Image</span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({ ...prev, coverFilePath: null, coverFile: null }));
                              if (fileInputRef.current) fileInputRef.current.value = '';
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
                            title="Remove image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">Click to upload cover image</span>
                          <span className="text-xs text-gray-400 mt-1">Recommended: 1200x600px, Max: 5MB</span>
                        </>
                      )}
                    </div>
                  </div>
               </div>
               <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                  <button 
                    onClick={() => setShowPublishModal(false)} 
                    className="px-6 py-2.5 font-bold text-gray-600 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={async () => {
                      await handleSaveClick(true)
                      setShowPublishModal(false)
                    }}
                    disabled={isSaving}
                    className="px-8 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md flex items-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isSaving ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : <Send className="w-4 h-4" />}
                    Confirm Publish
                  </button>
               </div>
            </div>
          </div>
        )}
        
        <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-gray-100 p-6 h-screen' : 'flex-1 min-h-0'} flex flex-col lg:flex-row gap-6 transition-all duration-300`}>
          
          {/* Editor Container */}
          <div className={`bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden flex flex-col flex-1 ${showPreview ? 'lg:w-1/2' : 'w-full'} transition-all duration-300 group hover:shadow-md hover:border-gray-300/80`}>
            {/* Toolbar */}
              <div className="border-b border-gray-100 p-3 flex gap-2 bg-white flex-wrap items-center justify-between sticky top-0 z-20 shrink-0">
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
                    
                    <div className="relative">
                      <button 
                        onClick={() => setShowTableMenu(!showTableMenu)} 
                        className={`p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all flex items-center gap-0.5 ${showTableMenu ? 'bg-white shadow-sm text-primary-600' : ''}`} 
                        title="Insert Table"
                      >
                        <Table className="w-4 h-4" />
                      </button>
                      
                      {showTableMenu && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setShowTableMenu(false)} />
                          <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-20 min-w-[240px]">
                            <div className="text-sm font-semibold text-gray-700 mb-3 text-center border-b border-gray-100 pb-2">
                              {tableDims.cols > 0 && tableDims.rows > 0 ? (
                                <span className="text-primary-600">{tableDims.rows} rows × {tableDims.cols} columns</span>
                              ) : (
                                'Select Table Size'
                              )}
                            </div>
                            <div className="grid grid-cols-10 gap-1.5" onMouseLeave={() => setTableDims({ rows: 0, cols: 0 })}>
                              {[...Array(10)].map((_, r) => (
                                [...Array(10)].map((_, c) => (
                                  <div
                                    key={`${r}-${c}`}
                                    className={`w-5 h-5 rounded-sm cursor-pointer transition-all duration-100 ${
                                      r < tableDims.rows && c < tableDims.cols 
                                        ? 'bg-primary-500 scale-110 shadow-sm' 
                                        : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                    onMouseEnter={() => setTableDims({ rows: r + 1, cols: c + 1 })}
                                    onClick={() => insertTable(r + 1, c + 1)}
                                  />
                                ))
                              ))}
                            </div>
                            <div className="mt-3 text-xs text-center text-gray-400">
                              Max 10x10
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <button onClick={() => insertMarkdown('```\n', '\n```')} className="p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all" title="Code Block"><Code className="w-4 h-4" /></button>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setShowChartMenu(!showChartMenu)} 
                        className={`p-1.5 hover:bg-white hover:shadow-sm rounded-md text-gray-600 transition-all flex items-center gap-0.5 ${showChartMenu ? 'bg-white shadow-sm text-primary-600' : ''}`} 
                        title="Insert Chart"
                      >
                        <BarChart className="w-4 h-4" />
                        <ChevronDown className="w-3 h-3 opacity-50" />
                      </button>
                      
                      {showChartMenu && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setShowChartMenu(false)} />
                          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 flex flex-col max-h-80 overflow-y-auto">
                            <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">Diagram Types</div>
                            {CHART_TEMPLATES.map((template) => (
                              <button
                                key={template.label}
                                onClick={() => {
                                  insertMarkdown(`\`\`\`mermaid\n${template.code}\n`, '```');
                                  setShowChartMenu(false);
                                }}
                                className="text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              >
                                {template.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
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
                className="flex-1 p-6 focus:outline-none resize-none font-mono text-gray-800 text-base leading-relaxed selection:bg-primary-100 selection:text-primary-900 w-full" 
                placeholder="Start writing"
              />
              <div className="bg-gray-50 px-4 py-2 text-xs text-gray-400 border-t border-gray-100 flex justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <span>Markdown Supported</span>
                  {lastAutoSave && (
                    <span className="flex items-center gap-1.5 text-gray-400 border-l border-gray-200 pl-3">
                      <Clock className="w-3 h-3" />
                      Auto-saved at {lastAutoSave.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  )}
                </div>
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
      </div>
  )
}

export default ArticleEditor
