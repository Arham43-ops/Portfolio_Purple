import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Award, FileText, ExternalLink, ChevronLeft, Search, Filter, Download, X, Trophy, Briefcase, GraduationCap, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import certificatesData from '../data/certificates.json';

type Certificate = {
  name: string;
  platform: string;
  date: string;
  file: string;
};

type Category = {
  title: string;
  icon: string;
  items: Certificate[];
};

// --- Premium UI Components ---

function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

function FloatingBadge({ position, color, size = 1 }: { position: [number, number, number], color: string, size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh position={position} ref={meshRef}>
        <octahedronGeometry args={[size, 0]} />
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={1}
          opacity={0.3}
          transparent
        />
      </mesh>
    </Float>
  );
}

function SceneContent() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.mouse;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.2, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.2, 0.05);
  });

  return (
    <group ref={group}>
      <FloatingBadge position={[12, 5, -2]} color="#8b5cf6" size={1.5} />
      <FloatingBadge position={[-12, -6, 2]} color="#4c1d95" size={1.2} />
      <FloatingBadge position={[2, -8, -5]} color="#7c3aed" size={0.8} />
      <FloatingBadge position={[-5, 8, -8]} color="#6d28d9" size={0.5} />
      <FloatingBadge position={[8, -4, -10]} color="#8b5cf6" size={1} />
    </group>
  );
}

function MovingGroup({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return <group ref={group}>{children}</group>;
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

function GlitchText({ text }: { text: string }) {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-100">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 text-purple-600 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-100">
        {text}
      </span>
    </div>
  );
}

function Particles() {
  return (
    <group>
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[0.05, 16, 16]} position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10
          ]}>
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} transparent opacity={0.5} />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

function SpotlightCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    setMouseX(clientX - left);
    setMouseY(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

function QuickPreview({ cert, onClose }: { cert: Certificate, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[85vh] bg-zinc-950 rounded-[2.5rem] border border-zinc-800 overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.2)]"
      >
        <div className="absolute top-6 right-6 z-20">
          <button 
            onClick={onClose}
            className="p-3 rounded-full bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-1">{cert.name}</h3>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{cert.platform} // Verified Credentials</p>
          </div>
          <div className="flex-grow bg-zinc-900 relative">
            <iframe 
              src={`${cert.file}#toolbar=0`} 
              className="w-full h-full border-none"
              title={cert.name}
            />
          </div>
          <div className="p-6 bg-zinc-950 flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-600 uppercase">System_Preview_Mode: Active</span>
            <a 
              href={cert.file} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Open Original <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certificates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = certificatesData as Category[];
  
  const allCertificates = useMemo(() => {
    return categories.flatMap(cat => cat.items.map(item => ({ ...item, categoryTitle: cat.title })));
  }, [categories]);

  const stats = useMemo(() => {
    return {
      total: allCertificates.length,
      coursera: categories.find(c => c.title.includes('Coursera'))?.items.length || 0,
      hackerrank: categories.find(c => c.title.includes('Hackerrank'))?.items.length || 0,
      internships: categories.find(c => c.title.includes('Icat'))?.items.length || 0
    };
  }, [allCertificates, categories]);

  const tabs = ['All', ...categories.map(cat => cat.title)];

  const filteredCerts = useMemo(() => {
    return allCertificates.filter(cert => {
      const matchesSearch = cert.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           cert.platform.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'All' || cert.categoryTitle === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [allCertificates, searchQuery, activeTab]);

  const resumes = useMemo(() => {
    return categories.find(cat => cat.title === 'Resumes')?.items || [];
  }, [categories]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6 overflow-hidden selection:bg-primary/30">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left" style={{ scaleX }} />
      
      {/* Immersive Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
        
        <Canvas camera={{ position: [0, 0, 15] }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4c1d95" />
            
            <SceneContent />
            <Particles />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="mb-12"
        >
          <Link 
            to="/" 
            className="group inline-flex items-center gap-3 text-zinc-500 hover:text-white transition-all font-mono text-sm px-4 py-2 rounded-full border border-zinc-900 hover:border-zinc-800 bg-zinc-900/20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            <span>System.Back()</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <header className="mb-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="h-px w-12 bg-primary/50" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Verified Credentials</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-8xl md:text-[10rem] font-bold tracking-tighter leading-[0.75] mb-12"
              >
                Beyond <br />
                <span className="text-primary italic font-display relative inline-block group">
                  <Magnetic>
                    <GlitchText text="Boundaries." />
                  </Magnetic>
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-4 left-0 h-2 bg-primary/20 -z-10" 
                  />
                </span>
              </motion.h1>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
                {[
                  { label: "Total Assets", value: stats.total, icon: Award },
                  { label: "Specializations", value: stats.coursera, icon: GraduationCap },
                  { label: "Skill Tests", value: stats.hackerrank, icon: Zap },
                  { label: "Industry Exp", value: stats.internships, icon: Briefcase },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-md"
                  >
                    <stat.icon className="w-4 h-4 text-primary/60 mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="lg:max-w-xs"
            >
              <p className="text-zinc-500 text-sm md:text-base font-mono leading-relaxed border-l-2 border-primary/20 pl-6 py-2">
                "Technical validation is the bedrock of professional trust. Here lies the evidence of my journey through the digital landscape."
              </p>
            </motion.div>
          </div>
        </header>

        {/* Featured Section */}
        {resumes.length > 0 && activeTab === 'All' && (
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-2xl font-bold text-white tracking-tighter uppercase tracking-[0.2em]">01 // Featured Records</h2>
              <div className="h-px flex-grow bg-zinc-900" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {resumes.map((resume, idx) => (
                <TiltCard key={idx} className="h-full">
                  <div className="relative group h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-gradient-x" />
                    <div className="relative bg-[#080808] p-12 rounded-[2.5rem] border border-zinc-800/50 flex flex-col md:flex-row items-center justify-between overflow-hidden h-full glass-shine">
                      <div className="flex flex-col md:flex-row items-center gap-10 mb-8 md:mb-0">
                        <div className="relative w-24 h-24 rounded-[2rem] bg-primary/5 flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform duration-700 shadow-inner">
                          <FileText className="w-12 h-12 text-primary" />
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-dashed border-primary/20 rounded-[2rem]"
                          />
                        </div>
                        <div className="text-center md:text-left">
                          <h3 className="text-4xl font-bold text-white mb-3 tracking-tight group-hover:text-glow transition-all duration-500">{resume.name}</h3>
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <span className="text-[10px] font-black text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">Verified Record</span>
                            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/50 px-3 py-1 rounded-lg">LAST_MODIFIED: {resume.date}</span>
                          </div>
                        </div>
                      </div>
                      <motion.a 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={resume.file} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-all shadow-2xl group/btn"
                      >
                        <Download className="w-6 h-6 mb-1 group-hover/btn:animate-bounce" />
                        <span className="text-[8px] font-bold uppercase tracking-tighter">Get PDF</span>
                      </motion.a>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </motion.section>
        )}

        {/* Navigation & Control */}
        <div className="sticky top-24 z-40 mb-20">
          <motion.div 
            className="bg-zinc-950/80 backdrop-blur-xl p-3 rounded-[2.5rem] border border-zinc-800/50 shadow-2xl flex flex-col lg:flex-row gap-4 items-center"
          >
            <div className="relative flex-grow w-full group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Query database for credentials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-zinc-600 focus:outline-none transition-colors font-mono text-xs uppercase tracking-widest"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white bg-zinc-900 p-1 rounded-md"
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex gap-1 p-1 bg-zinc-900/40 rounded-[1.8rem] border border-zinc-800/50 overflow-x-auto no-scrollbar max-w-full lg:w-auto w-full">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap overflow-hidden ${
                    activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span className="relative z-10">{tab}</span>
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h2 className="text-2xl font-bold text-white tracking-tighter uppercase tracking-[0.2em]">02 // Verified Stack</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-primary uppercase">{activeTab}</span>
                <span className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase">{filteredCerts.length} Items</span>
              </div>
            </div>
          </div>

          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCerts.map((cert, idx) => (
                <motion.div
                  key={cert.file}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
                  className="group relative"
                >
                  <SpotlightCard className="h-full rounded-[2rem]">
                    <div className="h-full bg-zinc-950/40 backdrop-blur-sm p-8 rounded-[2rem] border border-zinc-900 hover:border-primary/30 hover:bg-zinc-900/30 transition-all duration-500 flex flex-col justify-between group-hover:shadow-[0_0_40px_rgba(139,92,246,0.05)] overflow-hidden glass-shine">
                      {/* Decorative Index */}
                      <div className="absolute top-0 right-0 p-8">
                         <span className="text-5xl font-black text-zinc-900/20 group-hover:text-primary/10 transition-colors pointer-events-none italic">
                           #{ (idx + 1).toString().padStart(2, '0') }
                         </span>
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                          <div className={`p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 group-hover:border-primary/20 transition-colors ${
                            cert.platform === 'Coursera' ? 'text-blue-500' :
                            cert.platform === 'Hackerrank' ? 'text-green-500' :
                            'text-primary'
                          }`}>
                            <Award className="w-5 h-5" />
                          </div>
                          <div className="text-[10px] font-mono text-zinc-600 bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-900 group-hover:border-zinc-800 transition-colors">
                            {cert.date}
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-zinc-100 mb-2 leading-tight group-hover:text-white transition-colors">
                          {cert.name}
                        </h3>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
                          {cert.platform}
                        </p>
                      </div>
                      
                      <div className="relative z-10 mt-6 pt-6 border-t border-zinc-900/50 flex gap-3">
                        <button 
                          onClick={() => setSelectedCert(cert)}
                          className="flex-grow relative inline-flex items-center justify-center gap-3 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition-all duration-300"
                        >
                           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Preview</span>
                        </button>
                        <a 
                          href={cert.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn relative w-12 h-12 inline-flex items-center justify-center bg-zinc-900 hover:bg-primary rounded-xl border border-zinc-800 hover:border-primary transition-all duration-300 overflow-hidden"
                          title="Open PDF"
                        >
                           <ExternalLink className="relative z-10 w-4 h-4 text-zinc-600 group-hover/btn:text-white transition-colors" />
                           <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredCerts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-40 text-center"
            >
              <div className="relative inline-block mb-10">
                <Search className="w-16 h-16 text-zinc-900" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"
                />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No results found in main_branch</h3>
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.2em]">Check your search parameters or select a different category</p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Visual Accents */}
      <div className="fixed bottom-10 right-10 z-50">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-end"
        >
          <div className="px-6 py-3 rounded-full bg-zinc-950 border border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase tracking-widest shadow-2xl backdrop-blur-xl">
             Archived Success // {isLoaded ? 'Online' : 'Initializing...'}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <QuickPreview cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}


