import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [preloaderMounted, setPreloaderMounted] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div id="home" className="app-wrapper bg-primary text-primary">
      {preloaderMounted && (
        <Preloader
          onLoadComplete={() => setIsLoaded(true)}
          onHidden={() => setPreloaderMounted(false)}
          totalFrames={144}
        />
      )}

      {/* Render the global Navigation Bar */}
      <Navbar />

      {/* clip-path rounds corners without overflow:hidden, so sticky children still work */}
      <motion.div
        initial={{ scale: 0.92, clipPath: 'inset(0 0 0 0 round 16px)', opacity: 0 }}
        animate={isLoaded
          ? { scale: 1, clipPath: 'inset(0 0 0 0 round 0px)', opacity: 1 }
          : { scale: 0.92, clipPath: 'inset(0 0 0 0 round 16px)', opacity: 0 }
        }
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: isLoaded ? 'auto' : 'none' }}
      >
        <main>
          <HeroSection totalFrames={144} />

          {/* All subsequent sections */}
          <div className="content-under-hero" style={{ zIndex: 10, position: 'relative', backgroundColor: 'var(--bg-primary)' }}>
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <Footer />
          </div>
        </main>
      </motion.div>
    </div>
  );
}

export default App;
