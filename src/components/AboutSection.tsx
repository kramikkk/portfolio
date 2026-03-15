import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import './AboutSection.css';

const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Parallax setup for high-end feel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-5%"]);
  const backgroundTextX = useTransform(scrollYProgress, [0, 1], ["-10%", "5%"]);

  return (
    <section className="about-section" id="about" ref={containerRef}>
      {/* Massive subtle background text */}
      <motion.div
        className="about-bg-text"
        style={{ x: backgroundTextX }}
      >
        <span className="outline-text">MARK JERIC</span>
      </motion.div>

      <div className="container relative-z">
        <div className="about-grid-premium">

          {/* Left / Text Content */}
          <motion.div
            className="about-content-premium"
            style={{ y: textY }}
          >
            <motion.div
              className="about-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              ABOUT ME
            </motion.div>

            <motion.h2
              className="about-title-premium"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Mark Jeric B. Exconde <br />
            </motion.h2>

            <motion.div
              className="about-text-wrapper"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="about-body-text">
                As a dedicated Computer Engineering student and aspiring software engineer, my mission is to build digital products that are highly functional, fast, and scalable. I am constantly expanding my foundation in full-stack architecture and modern web technologies.
              </p>
              <p className="about-body-text">
                Whether working on academic projects or gaining real-world experience through my OJT, every line of code matters. I focus on clean architecture and continuous learning to ensure the software I build can scale efficiently.
              </p>
            </motion.div>

            {/* Awwwards style stats layout */}
            <div className="about-stats-premium">
              {/* Stat 1 */}
              <motion.div
                className="stat-box"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="stat-number-premium">2+</div>
                <div className="stat-divider"></div>
                <div className="stat-label-premium">Months<br />Experience</div>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                className="stat-box"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="stat-number-premium">7+</div>
                <div className="stat-divider"></div>
                <div className="stat-label-premium">Projects<br />Completed</div>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                className="stat-box"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="stat-number-premium">3+</div>
                <div className="stat-divider"></div>
                <div className="stat-label-premium">Academic<br />Awards</div>
              </motion.div>
            </div>

          </motion.div>

          {/* Right / Image Layer with Parallax Masking */}
          <div className="about-image-column">
            <motion.div
              className="about-image-mask"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="about-image-glow"></div>
              <motion.img
                src="/images/profile-pic.jpg"
                alt="Mark Jeric B. Exconde"
                className="about-img-parallax"
                style={{ y: imageY, scale: 1.15 }}
              />

              {/* Optional sophisticated overlay */}
              <div className="noise-overlay"></div>
              <div className="corner-accent top-left"></div>
              <div className="corner-accent bottom-right"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
