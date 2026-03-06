import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import BookCard from './components/BookCard';
import Reader from './App';
import Paywall from './components/Paywall';
import Auth from './components/Auth';
import { useBooks } from './hooks/useBooks';
import { useTheme } from './contexts/ThemeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { supabase } from './lib/supabase';
import { Loader2, Settings, Trash2, Type } from 'lucide-react';

function MainApp() {
  const { books, loading } = useBooks();
  const { theme, setTheme } = useTheme();
  const [selectedBook, setSelectedBook] = React.useState<any>(null);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showPaywall, setShowPaywall] = React.useState(false);
  const [fontSize, setFontSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);

  if (authLoading) return <div className="min-h-screen bg-[#FDFCFB] dark:bg-stone-950 flex items-center justify-center"><Loader2 className="animate-spin" size={32} /></div>;
  if (!user) return <Auth />;

  const isPremium = localStorage.getItem('isPremium') === 'true';

  const handleBookClick = (book: any) => {
    if (book.isPremium && !isPremium) {
      setShowPaywall(true);
    } else {
      setSelectedBook(book);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] dark:bg-stone-950">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white dark:bg-stone-800 rounded-xl overflow-hidden shadow-lg">
                  <div className="h-64 bg-stone-200 dark:bg-stone-700"></div>
                  <div className="p-6">
                    <div className="h-6 bg-stone-200 dark:bg-stone-700 rounded mb-3"></div>
                    <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded mb-2"></div>
                    <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const clearReadingHistory = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('progress-')) {
        localStorage.removeItem(key);
      }
    });
    alert('Reading history cleared!');
  };

  const getFontSizeClass = () => {
    switch(fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };

  if (selectedBook) {
    return (
      <Reader 
        book={selectedBook} 
        onClose={() => setSelectedBook(null)} 
      />
    );
  }

  return (
    <div className={`min-h-screen bg-[#FDFCFB] dark:bg-stone-950 transition-colors duration-500 ${theme}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 glass px-6 py-4 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white">
            House of Books
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              <Settings size={20} className="text-stone-600 dark:text-stone-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BookCard book={book} onClick={handleBookClick} />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-stone-900 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              >
                <Settings size={20} className="text-stone-600 dark:text-stone-400" />
              </button>
            </div>

            {/* Font Size */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                <Type size={16} />
                Font Size
              </label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      fontSize === size
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['light', 'dark', 'classic', 'nature', 'beach', 'cosmos'] as const).map(themeOption => (
                  <button
                    key={themeOption}
                    onClick={() => setTheme(themeOption)}
                    className={`px-3 py-2 rounded-lg capitalize text-sm transition-colors ${
                      theme === themeOption
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    {themeOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear History */}
            <div className="mb-6">
              <button
                onClick={clearReadingHistory}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Trash2 size={16} />
                Clear Reading History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paywall Modal */}
      {showPaywall && (
        <Paywall onClose={() => setShowPaywall(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
