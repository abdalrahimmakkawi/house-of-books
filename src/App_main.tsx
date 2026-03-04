import React from 'react';
import { motion } from 'motion/react';
import BookCard from './components/BookCard';
import Reader from './App';
import { useBooks } from './hooks/useBooks';
import { useTheme } from './contexts/ThemeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Loader2 } from 'lucide-react';

function MainApp() {
  const { books, loading } = useBooks();
  const { theme } = useTheme();
  const [selectedBook, setSelectedBook] = React.useState<any>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] dark:bg-stone-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-stone-600 dark:text-stone-400">Loading books...</p>
        </div>
      </div>
    );
  }

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
          <div className="text-sm text-stone-600 dark:text-stone-400">
            Your Personal Library
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
              onClick={() => setSelectedBook(book)}
            >
              <BookCard book={book} onClick={setSelectedBook} />
            </motion.div>
          ))}
        </div>
      </main>
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
