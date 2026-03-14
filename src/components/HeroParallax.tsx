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
  const leftTextY = useTransform(scrollYProgress, [0, 0.8], [0, -300]);
  const leftTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const rightTextY = useTransform(scrollYProgress, [0, 0.8], [0, -450]);
  const rightTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const bottomSocialsY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const bottomSocialsOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Mid-scroll content
  const midScrollY = useTransform(scrollYProgress, [0.3, 0.8], [200, -100]);
  const midScrollOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

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
            <span contentEditable suppressContentEditableWarning>Kramik</span><br />
            <span contentEditable suppressContentEditableWarning>Design Portfolio</span>
          </motion.h1>

          <motion.div
            className="skills-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="skill-item">
              <span className="skill-index">#01</span>
              <span className="skill-label">Brand & Logo Identity</span>
            </div>
            <div className="skill-item">
              <span className="skill-index">#02</span>
              <span className="skill-label">IoT UI/UX Design</span>
            </div>
            <div className="skill-item">
              <span className="skill-index">#03</span>
              <span className="skill-label">Web Systems & Dashboards</span>
            </div>
            <div className="skill-item">
              <span className="skill-index">#04</span>
              <span className="skill-label">Product Photography & Animation</span>
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
            <h2 className="subheadline">Crafting Intuitive Digital Experiences & Brand Identities.</h2>
            <p className="supporting-paragraph">
              Specializing in comprehensive design solutions—from striking logos and smart system interfaces to cinematic product animations that bring ideas to life.
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
            Merging logic <br />
            with <span className="highlight">emotion.</span>
          </h2>
          <p className="mid-description">
            I believe that the best interfaces don't just solve problems—they tell a story and leave a lasting impression. From the very first wireframe to the final deployment.
          </p>
        </motion.div>

        {/* Mid-Scroll Dynamic Text - Right */}
        <motion.div
          className="hero-content mid-block-right"
          style={{ y: midScrollY, opacity: midScrollOpacity }}
        >
          <h2 className="mid-headline">
            Pixel perfect <br />
            to the <span className="highlight">core.</span>
          </h2>
          <p className="mid-description">
            Every animation, interaction, and visual detail is meticulously crafted. Ensuring performance and aesthetics work together in perfect harmony.
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default HeroParallax;
