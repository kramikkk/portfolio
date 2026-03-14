import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import Preloader from './components/Preloader';
import HeroParallax from './components/HeroParallax';
import AboutSection from './components/AboutSection';
import ExpertiseSection from './components/ExpertiseSection';
import CaseStudies from './components/CaseStudies';
import ExperienceSection from './components/ExperienceSection';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

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
    <div className="app-wrapper bg-primary text-primary">
      {!isLoaded && (
        <Preloader onLoadComplete={() => setIsLoaded(true)} totalFrames={144} />
      )}

      {/* Main Content becomes interactive and visible once loaded */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ pointerEvents: isLoaded ? 'auto' : 'none' }}
      >
        <HeroParallax totalFrames={144} />

        {/* All subsequent sections */}
        <div className="content-under-hero" style={{ zIndex: 10, position: 'relative', backgroundColor: 'var(--bg-primary)' }}>
          <AboutSection />
          <ExpertiseSection />
          <CaseStudies />
          <ExperienceSection />
          <CTA />
          <Footer />
        </div>
      </motion.main>
    </div>
  );
}

export default App;
