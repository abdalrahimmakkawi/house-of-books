import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles, Zap, Shield, Star, Lock, MessageSquare, Volume2 } from 'lucide-react';

interface PaywallProps {
  onClose: () => void;
}

export default function Paywall({ onClose }: PaywallProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white dark:bg-stone-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors z-10"
        >
          <X size={20} className="text-stone-400" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Benefits */}
          <div className="p-8 md:p-12 bg-emerald-600 text-white">
            <div className="flex items-center gap-2 text-emerald-200 font-bold text-xs uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              Premium Access
            </div>
            <h2 className="font-serif text-3xl mb-8 leading-tight">
              Unlock the full potential of your mind.
            </h2>
            
            <ul className="space-y-6">
              {[
                { icon: Star, text: 'Unlock All 110 Books (vs 44 free)' },
                { icon: MessageSquare, text: 'AI Chat Assistant for every book' },
                { icon: Volume2, text: 'Audio Narration for all books' },
                { icon: Zap, text: 'Unlimited reading & listening' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 p-1 bg-emerald-500 rounded-lg">
                    <item.icon size={16} />
                  </div>
                  <span className="text-emerald-50 text-sm leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Pricing */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-stone-900">
            <div className="mb-8">
              <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Choose Plan</h3>
              <div className="space-y-4">
                <div className="p-4 border-2 border-emerald-600 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 relative">
                  <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-stone-900 dark:text-white">Annual</p>
                      <p className="text-xs text-stone-500">Save $12 - 2 months free!</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-stone-900 dark:text-white">$60/yr</p>
                      <p className="text-xs text-stone-400">$5/mo</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-stone-200 dark:border-stone-800 rounded-2xl hover:border-emerald-600 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-stone-900 dark:text-white">Monthly</p>
                      <p className="text-xs text-stone-500">Cancel anytime</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-stone-900 dark:text-white">$6/mo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 mb-4">
              Start 7-Day Free Trial
            </button>
            <p className="text-[10px] text-stone-400 text-center uppercase tracking-widest">
              No commitment. Cancel anytime.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
