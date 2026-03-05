import React from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Lock } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <motion.div
      layoutId={`book-${book.id}`}
      onClick={() => onClick(book)}
      className="group cursor-pointer flex flex-col h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-2/3 overflow-hidden rounded-xl book-shadow mb-4">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        {book.isPremium && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full p-2">
            <Lock size={16} className="text-white" />
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 mb-1">
          {book.category}
        </span>
        <h3 className="font-serif text-lg leading-tight mb-1 group-hover:text-emerald-700 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-stone-500 mb-3">{book.author}</p>
        
        <div className="mt-auto flex items-center gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{book.readTime} min read</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>Summary</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
