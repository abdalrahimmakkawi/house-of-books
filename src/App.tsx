import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, User, Sparkles, TrendingUp, Bookmark, Compass, Home, BookOpen, Settings, Moon, Sun, ChevronLeft, X } from 'lucide-react';
import { Book, Category } from './types';
import { SAMPLE_BOOKS, CATEGORIES } from './constants';
import BookCard from './components/BookCard';
import Reader from './components/Reader';
import Paywall from './components/Paywall';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function MainApp() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'library' | 'account'>('home');
  const [showPaywall, setShowPaywall] = useState(false);
  const { theme, setTheme } = useTheme();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => setShowWelcome(true), 1500);
      sessionStorage.setItem('hasSeenWelcome', 'true');
      return () => clearTimeout(timer);
    }
  }, []);

  const categoriesRef = useRef<HTMLDivElement>(null);

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredBooks = SAMPLE_BOOKS.filter(book => {
    const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFB] dark:bg-stone-950 main-bg transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass dark:bg-stone-900/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="font-serif text-2xl font-bold tracking-tight flex items-center gap-2 dark:text-white">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <Bookmark size={18} fill="currentColor" />
              </div>
              House of Books
            </h1>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-500 dark:text-stone-400">
              <button 
                onClick={() => setActiveTab('home')}
                className={activeTab === 'home' ? 'text-emerald-600' : 'hover:text-stone-900 dark:hover:text-white transition-colors'}
              >
                Explore
              </button>
              <button 
                onClick={() => setActiveTab('library')}
                className={activeTab === 'library' ? 'text-emerald-600' : 'hover:text-stone-900 dark:hover:text-white transition-colors'}
              >
                My Library
              </button>
              <button 
                onClick={() => setShowPaywall(true)}
                className="hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <Sparkles size={14} className="text-amber-500" />
                Premium
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input 
                type="text"
                placeholder="Search books, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-stone-100 dark:bg-stone-800 border-none rounded-full text-sm focus:ring-2 focus:ring-emerald-500/20 w-64 transition-all dark:text-white"
              />
            </div>
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors text-stone-500 dark:text-stone-400"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={() => setActiveTab('account')}
              className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors text-stone-500 dark:text-stone-400"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pb-24 md:pb-0">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <section className="px-6 py-16 md:py-24 bg-stone-50 dark:bg-stone-900/30 border-b border-stone-200 dark:border-stone-800">
              <div className="max-w-7xl mx-auto">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-4">
                    <Sparkles size={14} />
                    Daily Pick for You
                  </div>
                  <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-6 dark:text-white">
                    Understand the world's best ideas in <span className="italic text-emerald-600">15 minutes</span>.
                  </h2>
                  <p className="text-xl text-stone-500 dark:text-stone-400 mb-10 leading-relaxed">
                    Get the key insights from non-fiction bestsellers. Read or listen to summaries that fit your busy schedule.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setShowPaywall(true)}
                      className="bg-stone-900 dark:bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-stone-800 dark:hover:bg-emerald-700 transition-all shadow-lg shadow-stone-900/10"
                    >
                      Start Free Trial
                    </button>
                    <button 
                      onClick={scrollToCategories}
                      className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-8 py-4 rounded-full font-semibold hover:bg-stone-50 dark:hover:bg-stone-700 transition-all dark:text-white"
                    >
                      Browse Categories
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Categories & Content */}
            <section ref={categoriesRef} className="px-6 py-16 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  <button 
                    onClick={() => setActiveCategory('All')}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                      activeCategory === 'All' 
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                  >
                    All
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                        activeCategory === cat 
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm font-medium text-stone-400">
                  <div className="flex items-center gap-2 text-stone-900 dark:text-white">
                    <TrendingUp size={16} />
                    Trending
                  </div>
                  <div className="flex items-center gap-2 hover:text-stone-900 dark:hover:text-white cursor-pointer transition-colors">
                    <Compass size={16} />
                    Newest
                  </div>
                </div>
              </div>

              {/* Book Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                <AnimatePresence mode="popLayout">
                  {filteredBooks.map(book => (
                    <BookCard 
                      key={book.id} 
                      book={book} 
                      onClick={(b) => setSelectedBook(b)} 
                    />
                  ))}
                </AnimatePresence>
              </div>

              {filteredBooks.length === 0 && (
                <div className="py-24 text-center">
                  <p className="text-stone-400 text-lg">No books found matching your criteria.</p>
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === 'library' && (
          <section className="px-6 py-16 max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl mb-8 dark:text-white">My Library</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {SAMPLE_BOOKS.slice(0, 2).map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onClick={(b) => setSelectedBook(b)} 
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'account' && (
          <section className="px-6 py-16 max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl mb-12 dark:text-white">Account</h2>
            <div className="space-y-6">
              <div className="p-6 bg-stone-50 dark:bg-stone-900 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="font-bold dark:text-white">User Name</p>
                    <p className="text-sm text-stone-500">user@example.com</p>
                  </div>
                </div>
                <button className="text-sm text-emerald-600 font-semibold">Edit</button>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => setShowPaywall(true)}
                  className="w-full p-4 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles size={20} />
                    Upgrade to Premium
                  </div>
                  <ChevronLeft size={20} className="rotate-180" />
                </button>
                <button className="w-full p-4 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white rounded-xl font-semibold flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings size={20} />
                    Settings
                  </div>
                  <ChevronLeft size={20} className="rotate-180" />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Mobile Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass dark:bg-stone-900/90 px-6 py-4 flex justify-between items-center border-t border-stone-200 dark:border-stone-800 z-40">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-emerald-600' : 'text-stone-400'}`}
        >
          <Home size={20} />
          <span className="text-[10px] font-bold uppercase">Explore</span>
        </button>
        <button 
          onClick={() => setActiveTab('library')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'library' ? 'text-emerald-600' : 'text-stone-400'}`}
        >
          <BookOpen size={20} />
          <span className="text-[10px] font-bold uppercase">Library</span>
        </button>
        <button 
          onClick={() => setActiveTab('account')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'account' ? 'text-emerald-600' : 'text-stone-400'}`}
        >
          <User size={20} />
          <span className="text-[10px] font-bold uppercase">Account</span>
        </button>
      </div>

      {/* Footer (Desktop only) */}
      <footer className="hidden md:block bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-2xl text-white font-bold mb-6">House of Books</h2>
            <p className="max-w-sm mb-8">
              Empowering curious minds with the world's best ideas, summarized for your convenience.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <AnimatePresence>
        {selectedBook && (
          <Reader 
            book={selectedBook} 
            onClose={() => setSelectedBook(null)} 
          />
        )}
        {showPaywall && (
          <Paywall onClose={() => setShowPaywall(false)} />
        )}
        {showWelcome && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold"
          >
            <Sparkles size={18} />
            Welcome to House of Books!
            <button 
              onClick={() => setShowWelcome(false)}
              className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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
