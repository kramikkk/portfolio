import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin, Dribbble, Instagram } from 'lucide-react';
import './HeroParallax.css';

interface HeroParallaxProps {
  totalFrames?: number;
}

const HeroParallax: React.FC<HeroParallaxProps> = ({ totalFrames = 144 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Custom scroll tracking that we map to our frames
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);

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
      requestAnimationFrame(() => renderFrame(frameIndex, images));
    });

    return () => unsubscribe();
  }, [scrollYProgress, images, totalFrames]);

  // Parallax Text Scrolling Transforms
  // Segment 1: Initial Identity (0% - 25%)
  const leftTextY = useTransform(scrollYProgress, [0, 0.25], [0, -200]);
  const leftTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const rightTextY = useTransform(scrollYProgress, [0, 0.25], [0, -300]);
  const rightTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const bottomSocialsY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const bottomSocialsOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Segment 2: Philosophy / Mid-Blocks (25% - 55%)
  const midScrollY = useTransform(scrollYProgress, [0.25, 0.55], [150, -150]);
  const midScrollOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);

  // Segment 3: About / Bio Integration (60% - 100%)
  const aboutY = useTransform(scrollYProgress, [0.6, 0.95], [150, -50]);
  const aboutOpacity = useTransform(scrollYProgress, [0.6, 0.75, 0.9, 1], [0, 1, 1, 1]);
  const aboutBgTextX = useTransform(scrollYProgress, [0.6, 1], ["-10%", "5%"]);
  const aboutBgTextXReverse = useTransform(scrollYProgress, [0.6, 1], ["10%", "-5%"]);

  return (
    <div className="hero-container" ref={containerRef}>
      <motion.div className="sticky-hero">
        <canvas className="hero-canvas" ref={canvasRef} />
        <div className="hero-overlay"></div>

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
          >
            <span>Mark</span><br />
            <span>Jeric B. Exconde</span>
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
            <h2 className="subheadline"><span className='highlight' >CODENAME :</span> Kramik</h2>
            <p className="supporting-paragraph">
              Specializing in full-stack development—from robust backend architectures and API integrations to highly performant, accessible, and pixel-perfect frontend interfaces.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Social Icons */}
        <motion.div
          className="bottom-socials"
          style={{ y: bottomSocialsY, opacity: bottomSocialsOpacity }}
        >
          <a href="#" className="social-icon"><Linkedin size={20} /></a>
          <a href="#" className="social-icon"><Dribbble size={20} /></a>
          <a href="#" className="social-icon"><Instagram size={20} /></a>
        </motion.div>

        {/* Mid-Scroll Dynamic Text - Left */}
        <motion.div
          className="hero-content mid-block-left"
          style={{ y: midScrollY, opacity: midScrollOpacity }}
        >
          <h2 className="mid-headline">
            Writing code <br />
            with <span className="highlight">purpose.</span>
          </h2>
          <p className="mid-description">
            I believe that great software isn't just about elegant code—it's about creating robust, scalable solutions that solve real-world problems. From the first system architecture draft to production deployment.
          </p>
        </motion.div>

        {/* Mid-Scroll Dynamic Text - Right */}
        <motion.div
          className="hero-content mid-block-right"
          style={{ y: midScrollY, opacity: midScrollOpacity }}
        >
          <h2 className="mid-headline">
            Performant <br />
            to the <span className="highlight">core.</span>
          </h2>
          <p className="mid-description">
            Every component, database query, and API endpoint is meticulously optimized. Ensuring speed, security, and scalability work together in perfect harmony.
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
                Computer Engineering student and aspiring software engineer focused on building highly functional, fast, and scalable digital products. I specialize in full-stack architecture and clean code.
              </p>

              <div className="about-hero-stats">
                <div className="hero-stat-item">
                  <span className="hero-stat-num">2+</span>
                  <span className="hero-stat-label">Months OJT</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-num">8+</span>
                  <span className="hero-stat-label">Live Projects</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-num">3+</span>
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

export default HeroParallax;
