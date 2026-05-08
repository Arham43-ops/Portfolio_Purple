import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center overflow-hidden" id="home">
      {/* Unique Mesh Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_50%)]" />
      <div 
        className="absolute inset-0 -z-20 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      {/* Floating Animated Shapes */}
      <motion.div 
        animate={{ 
          y: [-20, 20, -20],
          rotate: [0, 360],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-64 h-64 border border-primary/20 rounded-full -z-10"
      />
      <motion.div 
        animate={{ 
          y: [20, -20, 20],
          rotate: [360, 0],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-primary/20 rounded-[2rem] -z-10"
      />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="px-5 py-1.5 rounded-full border border-primary/20 glass text-[10px] font-bold text-primary mb-10 tracking-[0.3em] uppercase"
        >
          Available for new Projects
        </motion.div>

        <div className="relative mb-6">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white"
          >
            Hey! , <br />I am <span className="text-primary italic font-display">Arham</span>
          </motion.h1>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute -bottom-4 right-0 w-1/2 h-1 bg-gradient-to-r from-transparent to-primary rounded-full hidden md:block origin-right"
          />
        </div>

        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-base md:text-xl font-medium text-zinc-500 mb-10 font-mono"
        >
          &lt;Full-Stack Developer /&gt;
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-xl text-zinc-500 text-base md:text-lg leading-relaxed mb-12 px-4 text-center"
        >
          Technology-driven <span className="text-zinc-300">problem solver</span> with experience in building digital solutions and improving workflows.
          Specializing in <span className="text-zinc-300">BSc IT</span> and <span className="text-zinc-300">scalable backend systems</span>.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-primary text-white font-bold rounded-2xl glow shadow-[0_10px_40px_rgba(139,92,246,0.3)] hover:shadow-[0_20px_50px_rgba(139,92,246,0.5)] transition-all flex items-center gap-4 group"
          >
            View My Work
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors">
              <ArrowRight className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
            </div>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 border border-zinc-800 text-white font-bold rounded-2xl hover:bg-white/5 hover:border-zinc-700 transition-all font-mono"
          >
            contact.me()
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-zinc-800 flex justify-center p-1"
        >
          <motion.div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
