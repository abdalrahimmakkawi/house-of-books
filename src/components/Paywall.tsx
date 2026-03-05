import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles, Zap, Shield, Star, Lock, MessageSquare, Volume2 } from 'lucide-react';

interface PaywallProps {
  onClose: () => void;
}

export default function Paywall({ onClose }: PaywallProps) {
  const [selectedPlan, setSelectedPlan] = React.useState<'monthly' | 'annual'>('annual');

  const handleCheckout = () => {
    window.open('https://house-of-books.lemonsqueezy.com/checkout/buy/df5fc3da-2939-4d0e-afaa-1f15b56610aa?variant=1370006', '_blank');
  };

  const handleStartFree = () => {
    onClose();
  };
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
            
            <div className="space-y-6 mb-8">
              <div className="bg-emerald-700/30 rounded-lg p-4">
                <h4 className="font-bold text-emerald-100 mb-2">Free Plan</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-200" />
                    <span className="text-emerald-50">44 Books (40% of library)</span>
                  </li>
                  <li className="flex items-center gap-2 text-emerald-300/60">
                    <X size={14} />
                    <span className="line-through">AI Chat Assistant</span>
                  </li>
                  <li className="flex items-center gap-2 text-emerald-300/60">
                    <X size={14} />
                    <span className="line-through">Audio Narration</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold text-emerald-100 mb-2">Premium Plan</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-200" />
                    <span className="text-emerald-50">110 Books (Full library)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-200" />
                    <span className="text-emerald-50">AI Chat Assistant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-200" />
                    <span className="text-emerald-50">Audio Narration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side: Pricing */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-stone-900">
            <div className="mb-8">
              <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Choose Plan</h3>
              <div className="space-y-4">
                <div 
                  className={`p-4 border-2 rounded-2xl cursor-pointer transition-all relative ${
                    selectedPlan === 'annual' 
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/10' 
                      : 'border-stone-200 dark:border-stone-800 hover:border-emerald-600'
                  }`}
                  onClick={() => setSelectedPlan('annual')}
                >
                  {selectedPlan === 'annual' && (
                    <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
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

                <div 
                  className={`p-4 border rounded-2xl cursor-pointer transition-all ${
                    selectedPlan === 'monthly' 
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/10' 
                      : 'border-stone-200 dark:border-stone-800 hover:border-emerald-600'
                  }`}
                  onClick={() => setSelectedPlan('monthly')}
                >
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

            <div className="space-y-4">
              <button 
                onClick={handleCheckout}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
              >
                Start 7-Day Free Trial
              </button>
              <p className="text-[10px] text-stone-400 text-center uppercase tracking-widest">
                {selectedPlan === 'annual' ? '$60/year after trial' : '$6/month after trial'} • No commitment. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
