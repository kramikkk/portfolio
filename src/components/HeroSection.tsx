import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Github, Instagram } from 'lucide-react';
import { useMotionValue, animate } from 'framer-motion';
import './HeroSection.css';

interface CounterProps {
  value: number;
  trigger: boolean;
}

const Counter: React.FC<CounterProps> = ({ value, trigger }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (trigger) {
      const animation = animate(count, value, { duration: 2, ease: "easeOut" });
      return animation.stop;
    }
  }, [trigger, value, count]);

  return <motion.span>{rounded}</motion.span>;
};



interface HeroParallaxProps {
  totalFrames?: number;
}

const HeroSection: React.FC<HeroParallaxProps> = ({ totalFrames = 144 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Custom scroll tracking that we map to our frames
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  // We preload again or use cached images to draw to canvas
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/frames/frame_${i.toString().padStart(3, '0')}_delay-0.041s.webp`;
      img.onload = () => {
        loadedCount++;
        loadedImages[i] = img;
        if (loadedCount === totalFrames) {
          setImages(loadedImages);
          // Only render once all loaded, initial render
          renderFrame(0, loadedImages);
        }
      };
      // Keep array shape even if err
      img.onerror = () => {
        loadedCount++;
        loadedImages[i] = new Image();
      }
    }
  }, [totalFrames]);

  const renderFrame = (index: number, imgArray: HTMLImageElement[]) => {
    if (!canvasRef.current || !imgArray[index] || !imgArray[index].complete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use viewport size for canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const img = imgArray[index];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    // Object cover logic
    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (images.length === 0) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // mapping 0 -> 1 progress to 0 -> totalFrames - 1
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(latest * totalFrames))
      );
      currentFrameRef.current = frameIndex;
      requestAnimationFrame(() => renderFrame(frameIndex, images));
    });

    const handleResize = () => {
      requestAnimationFrame(() => renderFrame(currentFrameRef.current, images));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollYProgress, images, totalFrames]);

  // Parallax Text Scrolling Transforms
  // Segment 1: Initial Identity (0% - 25%)
  const leftTextY = useTransform(scrollYProgress, [0, 0.25], [0, -250]);
  const leftTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const rightTextY = useTransform(scrollYProgress, [0, 0.25], [0, -450]);
  const rightTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const bottomSocialsY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const bottomSocialsOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Segment 2: Philosophy / Mid-Blocks (25% - 60%)
  // Left Block (Computer Engineer)
  const midLeftY = useTransform(scrollYProgress, [0.25, 0.55], [150, -150]);
  const midLeftOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.55], [0, 1, 1, 0]);

  // Right Block (Website Developer)
  const midRightY = useTransform(scrollYProgress, [0.3, 0.6], [100, -250]);
  const midRightOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.5, 0.6], [0, 1, 1, 0]);

  // Segment 3: About / Bio Integration (60% - 100%)
  const aboutDarkOverlayOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 0.35]);

  const aboutY = useTransform(scrollYProgress, [0.6, 0.95], [150, -50]);
  const aboutOpacity = useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [0, 1, 1, 1]);
  const aboutBgTextX = useTransform(scrollYProgress, [0.6, 1], ["-10%", "5%"]);
  const aboutBgTextXReverse = useTransform(scrollYProgress, [0.6, 1], ["10%", "-5%"]);

  // Trigger for count-up animation
  const [statsTriggered, setStatsTriggered] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.75 && !statsTriggered) {
        setStatsTriggered(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, statsTriggered]);

  return (
    <div className="hero-container" ref={containerRef}>
      <motion.div className="sticky-hero">
        <canvas className="hero-canvas" ref={canvasRef} />
        <div className="hero-overlay"></div>
        <motion.div className="hero-about-dark-overlay" style={{ opacity: aboutDarkOverlayOpacity }} />

        {/* Left Side Text Block */}
        <motion.div
          className="hero-content left-block"
          style={{ y: leftTextY, opacity: leftTextOpacity }}
        >
          <motion.div
            className="intro-line"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hey, welcome to the portfolio of
          </motion.div>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ cursor: 'default' }}
          >
            <span>Mark</span><br />
            <span>Jeric B. </span>
            <span className="highlight">Exconde</span>
          </motion.h1>

          <motion.div
            className="skills-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="skill-item">
              <span className="skill-index">#01</span>
              <span className="skill-label">Full-Stack Web Development</span>
            </div>
            <div className="skill-item">
              <span className="skill-index">#02</span>
              <span className="skill-label">Mobile Development</span>
            </div>
            <div className="skill-item">
              <span className="skill-index">#03</span>
              <span className="skill-label">Internet of Things</span>
            </div>
            <div className="skill-item">
              <span className="skill-index">#04</span>
              <span className="skill-label">Embedded Systems</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Text Block */}
        <motion.div
          className="hero-content right-block"
          style={{ y: rightTextY, opacity: rightTextOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="subheadline">
              <span className='highlight' >Codename:</span> Kramik
            </h2>
            <p className="supporting-paragraph">
              Specializing in full-stack development—from robust backend architectures and API integrations to highly performant, accessible, and pixel-perfect frontend interfaces.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom UI (Socials & Scroll Indicator) */}
        <motion.div
          className="hero-bottom-ui"
          style={{ y: bottomSocialsY, opacity: bottomSocialsOpacity }}
        >
          <div className="scroll-indicator">
            <span className="scroll-text">SCROLL</span>
            <div className="scroll-line">
              <motion.div
                className="scroll-dot"
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>

          <div className="bottom-socials">
            <a href="https://www.linkedin.com/in/kramikkk/" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={20} /></a>
            <a href="https://github.com/kramikkk" target="_blank" rel="noopener noreferrer" className="social-icon"><Github size={20} /></a>
            <a href="https://www.instagram.com/kramik_/" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram size={20} /></a>
          </div>
        </motion.div>

        {/* Mid-Scroll Dynamic Text - Left */}
        <motion.div
          className="hero-content mid-block-left"
          style={{ y: midLeftY, opacity: midLeftOpacity }}
        >
          <h2 className="mid-headline">
            Computer <br /> <span className="highlight">Engineer</span>
          </h2>
          <p className="mid-description">
            I bridge the gap between hardware precision and software excellence. By designing resilient system architectures and robust engineering workflows, I ensure every solution is grounded in technical rigor and structural integrity.
          </p>
        </motion.div>

        {/* Mid-Scroll Dynamic Text - Right */}
        <motion.div
          className="hero-content mid-block-right"
          style={{ y: midRightY, opacity: midRightOpacity }}
        >
          <h2 className="mid-headline">
            Website <br />
            <span className="highlight">Developer</span>
          </h2>
          <p className="mid-description">
            Specializing in modern full-stack ecosystems. I craft pixel-perfect, highly performant web applications that bridge the gap between complex backend logic and intuitive, world-class user interfaces.
          </p>
        </motion.div>

        {/* Segment 3: About Integration (The Finale) */}
        <motion.div
          className="hero-about-container"
          id="about"
          style={{ y: aboutY, opacity: aboutOpacity }}
        >
          {/* Upper Left background text */}
          <motion.div className="about-bg-text-hero top-left-bg" style={{ x: aboutBgTextX }}>
            <span className="outline-text-hero">KRAMIK</span>
          </motion.div>

          {/* Bottom Right background text (Mirrored) */}
          <motion.div className="about-bg-text-hero bottom-right-bg" style={{ x: aboutBgTextXReverse }}>
            <span className="outline-text-hero">KRAMIK</span>
          </motion.div>

          <div className="about-hero-center-content">
            <div className="about-hero-text">
              <div className="about-badge">ABOUT ME</div>
              <h2 className="about-hero-title">Mark Jeric B. <span className="highlight">Exconde</span></h2>
              <p className="about-hero-body">
                I’m a 22-year-old Computer Engineering student at Laguna State Polytechnic University - San Pablo City Campus who is currently living in Tiaong Quezon, Philippines.
              </p>

              <div className="about-hero-stats">
                <div className="hero-stat-item">
                  <span className="hero-stat-num"><Counter value={2} trigger={statsTriggered} />+</span>
                  <span className="hero-stat-label">Months OJT</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-num"><Counter value={8} trigger={statsTriggered} />+</span>
                  <span className="hero-stat-label">Live Projects</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-num"><Counter value={3} trigger={statsTriggered} />+</span>
                  <span className="hero-stat-label">Awards</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default HeroSection;
