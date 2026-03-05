import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, Bookmark, Share2, Play, Pause, BookOpen, List, Info, SkipBack, SkipForward, Volume2, Palette, Music, Loader2, MessageSquare, Send, Type, Sparkles } from 'lucide-react';
import { Book, Theme, ReaderSettings } from "./types";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useTheme, AMBIENT_SOUNDS } from "./contexts/ThemeContext";
import { generateBookNarration, askBookQuestion, expandBookContent } from "./services/geminiService";
import { useBooks } from "./hooks/useBooks";

interface ReaderProps {
  book: Book;
  onClose: () => void;
}

export default function Reader({ book, onClose }: ReaderProps) {
  console.log('Reader book data:', book);
  const { isPlaying, progress, togglePlay, seek } = useAudioPlayer();
  const { theme, setTheme, activeAmbient, ambientVolume, setAmbientVolume, playAmbient } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [narrationUrl, setNarrationUrl] = useState<string | null>(null);
  const [fullNarration, setFullNarration] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Typography Settings
  const [settings, setSettings] = useState<ReaderSettings>(() => {
    const saved = localStorage.getItem('reader-settings');
    return saved ? JSON.parse(saved) : { fontSize: 18, lineHeight: 1.6, fontFamily: 'serif' };
  });

  // AI Chat State
  const [showChat, setShowChat] = useState(false);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isAsking, setIsAsking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'summary' | 'insights' | 'author'>('summary');

  useEffect(() => {
    localStorage.setItem('reader-settings', JSON.stringify(settings));
  }, [settings]);

  // Restore scroll progress
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${book.id}`);
    if (savedProgress && readerRef.current) {
      const scrollPos = parseFloat(savedProgress);
      setTimeout(() => {
        if (readerRef.current) {
          readerRef.current.scrollTop = scrollPos;
        }
      }, 100);
    }
  }, [book.id]);

  // Save scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    localStorage.setItem(`progress-${book.id}`, scrollTop.toString());
  };

  useEffect(() => {
    if (isSpeaking) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev < totalTime) return prev + 1;
          return prev;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSpeaking, totalTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartNarration = async () => {
    const synth = window.speechSynthesis;

    // If already speaking, handle pause/resume
    if (isSpeaking) {
      if (synth.paused) {
        synth.resume();
      } else {
        synth.pause();
      }
      return;
    }

    // If we have the narration text already, just play it
    if (fullNarration) {
      playSpeech(fullNarration);
      return;
    }

    setIsGenerating(true);
    try {
      const expandedText = await expandBookContent(book.title, book.author, book.summary, book.keyInsights);
      setIsGenerating(false);
      
      if (expandedText) {
        const wordCount = expandedText.split(/\s+/).length;
        const calculatedTotalTime = Math.round((wordCount / 150) * 60);
        console.log("Narration generated. Word count:", wordCount, "Estimated time:", calculatedTotalTime, "seconds");
        console.log("Text preview:", expandedText.substring(0, 200) + "...");
        
        setTotalTime(calculatedTotalTime);
        setCurrentTime(0);
        setFullNarration(expandedText);
        playSpeech(expandedText);
      } else {
        alert("Could not generate expanded narration. Playing standard summary instead.");
        const shortText = `${book.title} by ${book.author}. ${book.summary}`;
        setFullNarration(shortText);
        playSpeech(shortText);
      }
    } catch (error) {
      console.error("Error in narration flow:", error);
      setIsGenerating(false);
    }
  };

  const playSpeech = (text: string) => {
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any current speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.lang = 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeechProgress(0);
      setCurrentTime(0);
    };
    utterance.onpause = () => setIsSpeaking(false);
    utterance.onresume = () => setIsSpeaking(true);
    
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const progress = (event.charIndex / text.length) * 100;
        setSpeechProgress(progress);
      }
    };

    // Wait for voices then select best
    const loadVoices = () => {
      const voices = synth.getVoices();
      const best = 
        voices.find(v => v.name === 'Google US English') ||
        voices.find(v => v.name.includes('Samantha')) ||
        voices.find(v => v.lang === 'en-US' && !v.localService) ||
        voices.find(v => v.lang.startsWith('en'));
      
      if (best) {
        console.log("Selected voice:", best.name);
        utterance.voice = best;
      }
      synth.speak(utterance);
    };

    if (synth.getVoices().length > 0) {
      loadVoices();
    } else {
      synth.onvoiceschanged = loadVoices;
    }
  };

  const handleAskQuestion = async () => {
    if (!chatQuestion.trim() || isAsking) return;

    const question = chatQuestion;
    setChatQuestion('');
    setChatHistory(prev => [...prev, { role: 'user', text: question }]);
    setIsAsking(true);

    const answer = await askBookQuestion(book.title, book.summary, question, chatHistory);
    setIsAsking(false);

    if (answer) {
      setChatHistory(prev => [...prev, { role: 'ai', text: answer }]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleShare = async () => {
    const shareData = {
      title: `House of Books: ${book.title}`,
      text: `Check out these key insights from "${book.title}" by ${book.author} on House of Books!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <motion.div
      ref={readerRef}
      onScroll={handleScroll}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 reader-bg overflow-y-auto"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-6 py-4 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="dark:text-white nature:text-emerald-100 classic:text-amber-100" />
        </button>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-emerald-600 text-white' : 'hover:bg-stone-100 dark:hover:bg-stone-800'}`}
          >
            <Palette size={20} className={showSettings ? 'text-white' : 'dark:text-white nature:text-emerald-100 classic:text-amber-100'} />
          </button>
          <button className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
            <Bookmark size={20} className="dark:text-white nature:text-emerald-100 classic:text-amber-100" />
          </button>
          <button 
            onClick={handleShare}
            className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
          >
            <Share2 size={20} className="dark:text-white nature:text-emerald-100 classic:text-amber-100" />
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="sticky top-[72px] z-30 glass p-6 border-b border-stone-200 dark:border-stone-800 shadow-xl"
          >
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Themes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-stone-400 flex items-center gap-2">
                  <Palette size={14} />
                  Themes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(['light', 'dark', 'classic', 'nature', 'beach', 'cosmos'] as Theme[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all ${
                        theme === t ? 'bg-emerald-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-stone-400 flex items-center gap-2">
                  <Type size={14} />
                  Typography
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-stone-500 w-12">Size</span>
                    <input 
                      type="range" min="14" max="24" step="1" 
                      value={settings.fontSize}
                      onChange={(e) => setSettings({...settings, fontSize: parseInt(e.target.value)})}
                      className="flex-grow accent-emerald-600"
                    />
                    <span className="text-xs font-bold text-stone-500">{settings.fontSize}px</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-stone-500 w-12">Height</span>
                    <input 
                      type="range" min="1.2" max="2.0" step="0.1" 
                      value={settings.lineHeight}
                      onChange={(e) => setSettings({...settings, lineHeight: parseFloat(e.target.value)})}
                      className="flex-grow accent-emerald-600"
                    />
                    <span className="text-xs font-bold text-stone-500">{settings.lineHeight}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSettings({...settings, fontFamily: 'serif'})}
                      className={`flex-grow py-2 rounded-lg text-xs font-bold border ${settings.fontFamily === 'serif' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-stone-200 dark:border-stone-700 text-stone-500'}`}
                    >
                      Serif
                    </button>
                    <button 
                      onClick={() => setSettings({...settings, fontFamily: 'sans'})}
                      className={`flex-grow py-2 rounded-lg text-xs font-bold border ${settings.fontFamily === 'sans' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-stone-200 dark:border-stone-700 text-stone-500'}`}
                    >
                      Sans
                    </button>
                  </div>
                </div>
              </div>

              {/* Ambient */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-stone-400 flex items-center gap-2">
                  <Music size={14} />
                  Ambient
                </h4>
                <div className="flex flex-wrap gap-2">
                  {AMBIENT_SOUNDS.map(s => (
                    <button
                      key={s.id}
                      onClick={() => playAmbient(s.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                        activeAmbient === s.id ? 'bg-amber-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                      }`}
                    >
                      {s.name}
                      {activeAmbient === s.id && s.id !== 'none' && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-1.5 h-1.5 rounded-full bg-white"
                        />
                      )}
                    </button>
                  ))}
                </div>
                {activeAmbient !== 'none' && (
                  <div className="mt-4 flex items-center gap-3">
                    <Volume2 size={14} className="text-stone-400" />
                    <input 
                      type="range" 
                      min="0" max="1" step="0.01" 
                      value={ambientVolume}
                      onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                      className="flex-grow accent-amber-600"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Book Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="w-full md:w-1/3 shrink-0">
            <motion.img
              layoutId={`book-${book.id}`}
              src={book.coverUrl}
              alt={book.title}
              className="w-full aspect-[2/3] object-cover rounded-xl book-shadow"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold text-emerald-600 nature:text-emerald-400 uppercase tracking-widest mb-2">
              {book.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4 dark:text-white nature:text-emerald-50 classic:text-amber-50">
              {book.title}
            </h1>
            <p className="text-xl text-stone-500 italic mb-6 nature:text-stone-400 classic:text-stone-400">
              by {book.author}
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <button 
                disabled={isGenerating}
                onClick={handleStartNarration}
                className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (isSpeaking || isPlaying) ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" />
                )}
                {isGenerating ? 'Generating Narration...' : (isSpeaking || isPlaying) ? 'Pause Narration' : 'Listen to Summary'}
              </button>
              <div className="text-sm text-stone-400 font-medium">
                {book.readTime} min read • 8 key insights
              </div>
            </div>
          </div>
        </div>

        {/* Audio Player Bar (Floating when playing) */}
        <AnimatePresence>
          {(isPlaying || isSpeaking) && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl glass rounded-2xl p-4 shadow-2xl z-50"
            >
              <div className="flex items-center gap-4">
                <img src={book.coverUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-bold dark:text-white nature:text-emerald-50 truncate max-w-[150px]">{book.title}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-stone-400">
                        {isSpeaking ? `${formatTime(currentTime)} / ${formatTime(totalTime)}` : '0:00 / 0:00'}
                      </span>
                      <SkipBack size={16} className="text-stone-400 cursor-pointer hover:text-stone-600" />
                      <button onClick={() => isSpeaking ? handleStartNarration() : togglePlay()}>
                        {(isPlaying || isSpeaking) ? <Pause size={20} className="dark:text-white nature:text-emerald-50" /> : <Play size={20} className="dark:text-white nature:text-emerald-50" />}
                      </button>
                      <SkipForward size={16} className="text-stone-400 cursor-pointer hover:text-stone-600" />
                    </div>
                  </div>
                  <div className="relative h-1 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                    if (isSpeaking) return; // Speech synthesis doesn't support easy seeking this way
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    seek((x / rect.width) * 100);
                  }}>
                    <div 
                      className="absolute top-0 left-0 h-full bg-emerald-600 transition-all duration-100"
                      style={{ width: `${isSpeaking ? speechProgress : progress}%` }}
                    />
                  </div>
                </div>
                <Volume2 size={18} className="text-stone-400 hidden sm:block" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Tabs */}
        <div className="border-b border-stone-200 dark:border-stone-800 mb-12 flex gap-8">
          <button 
            onClick={() => setActiveTab('summary')}
            className={`pb-4 border-b-2 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'summary' 
                ? 'border-emerald-600 text-emerald-600' 
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <BookOpen size={18} />
            Summary
          </button>
          <button 
            onClick={() => setActiveTab('insights')}
            className={`pb-4 border-b-2 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'insights' 
                ? 'border-emerald-600 text-emerald-600' 
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <List size={18} />
            Key Insights
          </button>
          <button 
            onClick={() => setActiveTab('author')}
            className={`pb-4 border-b-2 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'author' 
                ? 'border-emerald-600 text-emerald-600' 
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            <Info size={18} />
            About Author
          </button>
        </div>

        {/* Text Content */}
        <article 
          className={`prose prose-stone dark:prose-invert nature:prose-emerald classic:prose-amber max-w-none ${settings.fontFamily === 'serif' ? 'font-serif' : 'font-sans'}`}
          style={{ 
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight
          }}
        >
          {activeTab === 'summary' && (
            <>
              <h2 className="font-serif text-3xl mb-6 dark:text-white nature:text-emerald-50 classic:text-amber-50">Introduction</h2>
              <p className="text-stone-700 dark:text-stone-300 nature:text-emerald-100/80 classic:text-amber-100/80 leading-relaxed mb-8">
                {book.summary || book.longSummary || 'Summary coming soon'}
              </p>
            </>
          )}
          
          {activeTab === 'insights' && (
            <>
              <h2 className="font-serif text-3xl mb-6 dark:text-white nature:text-emerald-50 classic:text-amber-50">Key Insights</h2>
              <div className="space-y-8">
                {book.keyInsights.map((insight, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 nature:bg-emerald-900/40 text-emerald-600 nature:text-emerald-400 flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 nature:text-emerald-100/80 classic:text-amber-100/80 leading-relaxed pt-1">
                      {insight}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {activeTab === 'author' && (
            <>
              <h2 className="font-serif text-3xl mb-6 dark:text-white nature:text-emerald-50 classic:text-amber-50">About the Author</h2>
              <div className="bg-stone-50 dark:bg-stone-800/50 nature:bg-emerald-50/30 classic:bg-amber-50/30 rounded-xl p-8 mb-8">
                <h3 className="text-xl font-bold mb-4 text-stone-900 dark:text-stone-100 nature:text-emerald-900 classic:text-amber-900">
                  {book.author}
                </h3>
                <p className="text-stone-600 dark:text-stone-400 nature:text-emerald-700/80 classic:text-amber-700/80 leading-relaxed">
                  {book.author} is the author of "{book.title}". This book provides valuable insights and perspectives that have helped countless readers achieve personal and professional growth.
                </p>
              </div>
            </>
          )}
        </article>
      </div>

      {/* AI Chat Button */}
      <button 
        onClick={() => setShowChat(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 transition-all z-40 group"
      >
        <MessageSquare size={24} />
        <span className="absolute right-full mr-4 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Ask Gemini about this book
        </span>
      </button>

      {/* AI Chat Sidebar */}
      <AnimatePresence>
        {showChat && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChat(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-stone-900 shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white">Book Assistant</h3>
                    <p className="text-xs text-stone-500">Powered by Gemini</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChat(false)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                >
                  <X size={20} className="text-stone-400" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {chatHistory.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-stone-50 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                      <MessageSquare size={32} />
                    </div>
                    <p className="text-stone-500 text-sm">Ask anything about "{book.title}"</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {['What is the main takeaway?', 'Explain the 3rd insight', 'How can I apply this?'].map(q => (
                        <button 
                          key={q}
                          onClick={() => {
                            setChatQuestion(q);
                            // Auto-send if we want, or just set it
                          }}
                          className="text-xs bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 px-3 py-1.5 rounded-full text-stone-600 dark:text-stone-400 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                      msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAsking && (
                  <div className="flex justify-start">
                    <div className="bg-stone-100 dark:bg-stone-800 p-4 rounded-2xl rounded-tl-none">
                      <Loader2 size={18} className="animate-spin text-emerald-600" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-6 border-t border-stone-200 dark:border-stone-800">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Ask a question..."
                    value={chatQuestion}
                    onChange={(e) => setChatQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                    className="w-full pl-4 pr-12 py-3 bg-stone-100 dark:bg-stone-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 dark:text-white"
                  />
                  <button 
                    onClick={handleAskQuestion}
                    disabled={!chatQuestion.trim() || isAsking}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}