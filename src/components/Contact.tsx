import { motion } from 'motion/react';
import { Mail, Instagram, Twitter, Linkedin, Youtube, Send, MapPin, Phone, Github } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-24 md:py-48 px-6 md:px-24 max-w-7xl mx-auto" id="contact">
      <div className="relative group">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-primary font-mono text-xs uppercase tracking-[0.5em] mb-8"
        >
          Got a Vision?
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.8] mb-16 md:mb-20"
        >
          Let's make it <br />
          <span className="text-primary italic font-display">Reality.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8 md:space-y-10"
          >
            <p className="text-xl md:text-2xl text-zinc-400 leading-tight max-w-sm">
              Currently accepting new projects and collaboration opportunities for 2024.
            </p>
            
            <motion.a 
              href="mailto:topiwalaarham@gmail.com"
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-4 group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="space-y-1 text-left">
                <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Drop an email</p>
                <p className="text-lg md:text-2xl font-bold text-white tracking-tight break-all">topiwalaarham@gmail.com</p>
              </div>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6 md:items-end"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
               {[
                 { name: 'GitHub', icon: Github, link: 'https://github.com/Arham43-ops' },
                 { name: 'LinkedIn', icon: Linkedin, link: '#' },
                 { name: 'Email', icon: Mail, link: 'mailto:topiwalaarham@gmail.com' },
                 { name: 'Location', icon: MapPin, link: '#' },
                 { name: 'Phone', icon: Phone, link: 'tel:+919512959909' },
                 { name: 'Website', icon: Send, link: 'https://arham43-ops.netlify.app/' }
               ].map((social) => (
                 <motion.a
                   key={social.name}
                   href={social.link}
                   whileHover={{ y: -5 }}
                   className="p-4 md:p-5 rounded-2xl glass border border-zinc-800/50 flex flex-col items-center justify-center gap-2 group/item hover:border-primary/30 transition-all"
                 >
                   <social.icon className="w-4 h-4 text-zinc-500 group-hover/item:text-primary transition-colors" />
                   <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest group-hover/item:text-zinc-300 transition-colors">{social.name}</span>
                 </motion.a>
               ))}
            </div>
            
            <p className="text-zinc-600 text-[10px] font-mono italic md:text-right">
              Built with precision and passion. © 2024
            </p>
          </motion.div>
        </div>

        {/* Massive Background Text */}
        <div className="absolute -bottom-16 -right-12 text-[12rem] font-bold text-zinc-900/10 pointer-events-none select-none -z-10 hidden lg:block">
          REACH
        </div>
      </div>
    </section>
  );
}
