import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';
import './CTA.css';

const CTA = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  // Scale the CTA card up as the user scrolls it into the center of the viewport
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section className="cta-section" id="contact" ref={containerRef}>
      <div className="container">
        <motion.div
          className="cta-content"
          style={{ scale, opacity, y }}
        >
          <div className="cta-background-effect" />

          <h2 className="cta-title">
            Let's Build Something <br />
            <span className="highlight-text">Extraordinary</span> Together
          </h2>

          <p className="cta-description">
            Whether you need a robust full-stack application, complex API integration, or a high-performance frontend—I'm ready to bring your technical vision to life.
          </p>

          <div className="cta-buttons">
            <a href="mailto:mrkjrc.xcnd@gmail.com" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              <span>Send Email</span>
              <Mail size={20} />
            </a>
            <a href="/Resume-links.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              <FileText size={20} />
              <span>View Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
