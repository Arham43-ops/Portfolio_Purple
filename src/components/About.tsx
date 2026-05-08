import { motion } from 'motion/react';

// Decorative symbols (+, x, o) matching the screenshot
const DecoSymbols = () => (
  <>
    <motion.div 
      animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 right-4 text-primary opacity-60 text-xl font-bold"
    >
      +
    </motion.div>
    <motion.div 
      animate={{ y: [0, 10, 0], rotate: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-4 right-10 text-primary opacity-40 text-2xl font-bold"
    >
      x
    </motion.div>
    <motion.div 
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-10 left-4 text-primary opacity-30 text-lg"
    >
      ○
    </motion.div>
  </>
);

export default function About() {
  return (
    <section className="py-24 px-6 md:px-24 max-w-7xl mx-auto" id="about">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">About Me</h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed text-base">
            <p>
              I'm Arham Topiwala, a BSc IT graduate and technology-driven problem solver with experience in building digital solutions, managing systems, and improving workflows.
            </p>
            <p>
              Skilled in both software development and practical business applications, I focus on efficiency, scalability, and user experience. My background includes internships in web development and data management roles.
            </p>
            <p>
              I believe in modular design and clean architecture to solve real-world problems effectively.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="relative flex justify-center items-center group"
        >
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
            <DecoSymbols />
            
            {/* Interactive Speech Bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -top-10 right-0 bg-primary text-white text-[10px] px-4 py-2 rounded-2xl rounded-bl-none font-bold shadow-lg z-20 group-hover:scale-110 transition-transform"
            >
              Meow! Ready to code?
            </motion.div>

            {/* Bobbing Animation Container */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -2, 2, 0]
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10 cursor-pointer"
            >
              {/* Pixel Cat SVG - Carefully constructed to match the reference */}
              <svg 
                viewBox="0 0 16 16" 
                className="w-64 h-64 text-[#a78bfa] drop-shadow-[0_20px_50px_rgba(167,139,250,0.3)] group-hover:text-primary transition-colors"
                fill="currentColor"
                shapeRendering="crispEdges"
              >
                {/* Ears */}
                <motion.g animate={{ y: [0, -0.5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                  <rect x="5" y="2" width="1" height="1" />
                  <rect x="4" y="3" width="2" height="1" />
                </motion.g>
                <motion.g animate={{ y: [0, -0.5, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}>
                  <rect x="11" y="2" width="1" height="1" />
                  <rect x="10" y="3" width="2" height="1" />
                </motion.g>

                {/* Head Top */}
                <rect x="6" y="3" width="4" height="1" />
                
                {/* Main Body/Face */}
                <rect x="3" y="4" width="11" height="7" />
                
                {/* Face Sides */}
                <rect x="2" y="5" width="1" height="5" />
                <rect x="14" y="5" width="1" height="5" />
                
                {/* Tail (Left Side) - Animated Swipe */}
                <motion.g
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ originX: "2px", originY: "10px" }}
                >
                  <rect x="0" y="7" width="1" height="3" />
                  <rect x="1" y="6" width="1" height="4" />
                  <rect x="2" y="7" width="1" height="1" />
                </motion.g>
                
                {/* Feet */}
                <rect x="4" y="11" width="2" height="1" />
                <rect x="10" y="11" width="2" height="1" />

                {/* Eyes (White Pixels) with "looking around" animation */}
                <motion.rect 
                  animate={{ x: [7, 7, 6, 8, 7] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.5, 0.6, 1] }}
                  y="6" width="1" height="1" fill="#fff" 
                />
                <motion.rect 
                  animate={{ x: [11, 11, 10, 12, 11] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.5, 0.6, 1] }}
                  y="6" width="1" height="1" fill="#fff" 
                />
              </svg>
            </motion.div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
