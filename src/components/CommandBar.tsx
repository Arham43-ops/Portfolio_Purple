import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Clock, Zap, Coffee, Code } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function CommandBar() {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'status' | 'tech' | 'session'>('status');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-2xl">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-2xl border border-zinc-800/50 p-2 flex items-center justify-between gap-4 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab('status')}
            className={cn(
              "px-3 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap",
              activeTab === 'status' ? "bg-primary/20 text-primary" : "text-zinc-500 hover:bg-zinc-800/50"
            )}
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Status</span>
          </button>
          <button 
            onClick={() => setActiveTab('tech')}
            className={cn(
              "px-3 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap",
              activeTab === 'tech' ? "bg-primary/20 text-primary" : "text-zinc-500 hover:bg-zinc-800/50"
            )}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Tech Stack</span>
          </button>
          <div className="w-px h-4 bg-zinc-800 mx-2" />
          <div className="flex items-center gap-3 px-3">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap">Online</span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pr-4">
          <AnimatePresence mode="wait">
            {activeTab === 'status' && (
              <motion.div
                key="status"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2"
              >
                <Coffee className="w-3.5 h-3.5 text-orange-500/50" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tight">Vibe: Coding</span>
              </motion.div>
            )}
            {activeTab === 'tech' && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2"
              >
                <Code className="w-3.5 h-3.5 text-blue-500/50" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tight">React • Node • AI</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-800">
            <Clock className="w-3 h-3 text-zinc-600" />
            <span className="text-[10px] font-mono text-zinc-300 tabular-nums">
              {formatTime(time)}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
