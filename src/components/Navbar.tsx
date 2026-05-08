import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { Menu, X, Terminal } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Projects', path: '/#projects' },
  { name: 'Contact', path: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-zinc-900/50 py-3" : "bg-transparent"
      )}
      id="navbar"
    >
      {/* Scroll Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]"
        style={{ scaleX }}
        id="scroll-progress"
      />
      
      <Link to="/" className="text-xl md:text-2xl font-display italic text-primary flex items-center gap-2" id="logo">
        <Terminal className="w-5 h-5 md:w-6 md:h-6" />
        arham.ops
      </Link>
      
      {/* Desktop Links */}
      <div className="hidden md:flex gap-8" id="nav-links">
        {navItems.map((item) => {
          const isAnchor = item.path.includes('#');
          const isSamePageAnchor = location.pathname === '/' && isAnchor;
          
          if (isSamePageAnchor) {
            return (
              <a
                key={item.name}
                href={item.path.split('#')[1] ? `#${item.path.split('#')[1]}` : '/'}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === item.path ? "text-primary" : "text-zinc-400 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-zinc-900 p-8 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {navItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-2xl font-bold tracking-tighter flex items-center justify-between group",
                    location.pathname === item.path ? "text-primary" : "text-zinc-500 hover:text-white"
                  )}
                >
                  {item.name}
                  <span className="text-[10px] text-zinc-800 font-mono group-hover:text-primary/50 transition-colors">0{idx + 1}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
