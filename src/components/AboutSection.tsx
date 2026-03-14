import { motion } from 'framer-motion';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Placeholder for duotone portrait or AI visual */}
            <div className="about-image-placeholder">
              <div className="abstract-shape shape-1"></div>
              <div className="abstract-shape shape-2"></div>
            </div>
          </motion.div>

          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="section-title">
              Bridging the Gap Between <span className="highlight">Design</span> and <span className="highlight">Technology</span>
            </h2>
            <p className="about-description">
              My creative mission is to fuse aesthetics with functionality, delivering digital experiences that are not only visually stunning but intuitively robust. With a multidisciplinary approach spanning brand identity, complex IoT interfaces, and comprehensive web systems, I build products that speak for themselves.
            </p>
            <p className="about-description">
              Every detail matters—from the micro-animations that surprise and delight users, to the thoughtful architecture that ensures seamless navigation. I specialize in turning complex technological challenges into elegant design solutions.
            </p>
            
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">40+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Industry Awards</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
