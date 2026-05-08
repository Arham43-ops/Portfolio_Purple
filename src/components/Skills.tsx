import { motion } from 'motion/react';
import { Code2, Layout, Database, Terminal, Layers, Cpu } from 'lucide-react';

const skillGroups = [
  { 
    name: 'Core Competencies', 
    icon: Layout,
    skills: ['Problem Solving', 'Full Stack Dev', 'API Integration', 'System Optimization'],
    color: 'from-blue-500/20 to-primary/20'
  },
  { 
    name: 'Technical Depth', 
    icon: Cpu,
    skills: ['Scalable Backends', 'System Design', 'AI Tools', 'LLM Integration'],
    color: 'from-primary/20 to-purple-500/20'
  },
  { 
    name: 'Strategic & Professional', 
    icon: Terminal,
    skills: ['Project Management', 'Data Management', 'Communication', 'Collaborative Design'],
    color: 'from-purple-500/20 to-pink-500/20'
  },
];

export default function Skills() {
  return (
    <section className="relative py-32 px-6 md:px-24 max-w-7xl mx-auto overflow-hidden" id="skills">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="flex flex-col items-center mb-24 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="px-4 py-1 rounded-full border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-6"
        >
          Tech Stack
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter leading-none">
          Skills & <span className="text-primary italic">Tools</span>
        </h2>
        <p className="text-zinc-500 max-w-lg mx-auto text-base leading-relaxed">
          The structural foundation of my digital craftsmanship, focused on performance and scalability.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className={`glass relative p-10 rounded-[2.5rem] border border-zinc-800/50 hover:border-primary/50 transition-all duration-500 group overflow-hidden`}
          >
            {/* Background Gradient Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500">
                <group.icon className="w-8 h-8 text-primary" />
              </div>

              <h3 className="text-2xl font-bold mb-8 text-zinc-100 group-hover:text-primary transition-colors">{group.name}</h3>
              
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.05 }}
                    className="px-5 py-2 rounded-xl bg-background/50 border border-zinc-800 text-sm font-medium text-zinc-400 group-hover:border-primary/20 group-hover:text-primary/80 transition-all backdrop-blur-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
