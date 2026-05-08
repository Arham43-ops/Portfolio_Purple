import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Star, GitFork, BookOpen, ChevronLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

const techBanners = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2032&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2070&auto=format&fit=crop',
];

export default function Archive() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('https://api.github.com/users/Arham43-ops/repos?sort=updated&per_page=100');
        const data = await response.json();
        if (Array.isArray(data)) {
          setRepos(data);
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group font-mono text-sm"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>
        </motion.div>

        <header className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-1 rounded-full border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-8 inline-block"
              >
                Project Archive
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.8] mb-8"
              >
                The Full <br />
                <span className="text-primary italic font-display">Portfolio.</span>
              </motion.h1>
            </div>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="relative w-full md:w-80"
            >
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
               <input 
                 type="text" 
                 placeholder="Search systems..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-zinc-600 font-mono"
               />
            </motion.div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-[480px] rounded-[3.5rem] bg-zinc-900/50 animate-pulse border border-zinc-800" />
            ))
          ) : (
            filteredRepos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 3) * 0.1, duration: 0.8 }}
                className="group relative h-[480px] rounded-[3.5rem] overflow-hidden border border-zinc-800/50 hover:border-primary/50 transition-all duration-500 flex flex-col"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={techBanners[idx % techBanners.length]} 
                    alt={repo.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                         <BookOpen className="w-4 h-4 text-primary" />
                         <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">{repo.language || 'Code'}</span>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex items-center gap-1.5 text-zinc-500">
                            <Star className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold font-mono">{repo.stargazers_count}</span>
                         </div>
                         <div className="flex items-center gap-1.5 text-zinc-500">
                            <GitFork className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold font-mono">{repo.forks_count}</span>
                         </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tighter group-hover:text-primary transition-colors line-clamp-1">
                      {repo.name.replace(/-/g, ' ')}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {repo.description || 'A comprehensive technology project focused on robust backend systems and modern web architecture.'}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {(repo.topics && repo.topics.length > 0 ? repo.topics : ['Full-Stack', 'Refined', 'Modular']).slice(0, 3).map((topic, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-bold text-zinc-500 border border-zinc-800/50 px-3 py-1 rounded-full uppercase tracking-tighter bg-zinc-900/30">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-8">
                    <a 
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow py-3.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all group/btn"
                    >
                      Source Code <Github className="w-3.5 h-3.5 transition-transform group-hover/btn:rotate-12" />
                    </a>
                    {repo.homepage && (
                      <a 
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 bg-white text-black rounded-2xl hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
