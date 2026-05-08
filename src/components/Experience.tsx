import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    year: 'OCT 2025 - FEB 2026',
    role: 'Website Design & Development Intern',
    at: 'ICAT Internship Studio',
    description: 'Built responsive web interfaces with focus on usability and cross-browser compatibility. Applied core web development concepts to deliver a complete project during the internship.',
  },
  {
    year: 'JUL 2025 - AUG 2025',
    role: 'Data Entry Contract',
    at: 'Injala Pvt. Ltd.',
    description: 'Entered, verified, and updated large batches of data with strong attention to accuracy and formatting. Organized and cleaned datasets to support internal reporting.',
  },
  {
    year: 'JUNE 2024 - JULY 2025',
    role: 'Online Business Manager',
    at: 'Genuine Bags',
    description: 'Managed online operations including product listings, customer queries, and order processing across digital platforms. Updated and organized product catalogues.',
  },
];

export default function Experience() {
  return (
    <section className="py-32 px-6 md:px-24 max-w-7xl mx-auto" id="experience">
      <div className="flex flex-col gap-24">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            {/* Year Sidebar */}
            <div className="md:w-1/4 pt-2">
              <span className="text-5xl md:text-6xl font-bold font-display italic text-zinc-900 leading-none tracking-tighter sticky top-32">
                {exp.year.split(' ')[0]}
              </span>
            </div>

            {/* Content Card */}
            <div className="md:w-3/4 glass p-8 md:p-12 rounded-[2rem] border border-zinc-800/30 relative group hover:border-primary/30 transition-colors duration-700">
              <div className="absolute top-8 right-8 text-primary/20 group-hover:text-primary transition-colors duration-700">
                <Briefcase className="w-8 h-8" />
              </div>
              
              <div className="max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tighter">
                  {exp.role}
                </h3>
                <p className="text-primary font-mono text-sm uppercase tracking-[0.3em] mb-8">
                  {exp.at}
                </p>
                <p className="text-zinc-500 text-lg md:text-xl leading-relaxed italic mb-10">
                  "{exp.description}"
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {['Lead Development', 'Architecture', 'UI Strategy'].map((tag) => (
                    <div key={tag} className="px-6 py-2 rounded-full border border-zinc-800 text-xs font-bold text-zinc-600 uppercase tracking-widest group-hover:border-primary/20 group-hover:text-zinc-400 transition-colors">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
