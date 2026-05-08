import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scene3D from './components/Scene3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Certificates from './pages/Certificates';
import Archive from './pages/Archive';
import CommandBar from './components/CommandBar';

function HomePage() {
  return (
    <main className="relative z-10">
      <Hero />
      <div className="relative">
        <Scene3D />
        <About />
        <Skills />
      </div>
      <Experience />
      <Projects />
      <Contact />
      <CommandBar />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative selection:bg-primary selection:text-white bg-background overflow-x-hidden min-h-screen">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>

        <footer className="py-12 border-t border-zinc-900/50 text-center text-zinc-600 text-xs">
          <p>&copy; {new Date().getFullYear()} Arham Topiwala. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}
