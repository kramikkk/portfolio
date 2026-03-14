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
              Bridging the Gap Between <span className="highlight">Creative Vision</span> and <span className="highlight">Technical Execution</span>
            </h2>
            <p className="about-description">
              My mission is to build digital products that are not just highly functional, but exceptionally fast and scalable. With a strong foundation in full-stack architecture, I specialize in crafting robust web applications using React, Node.js, and modern cloud infrastructure.
            </p>
            <p className="about-description">
              Whether integrating complex REST APIs or optimizing frontend rendering performance, every line of code matters. I focus on clean architecture, DRY principles, and seamless continuous delivery to ensure the software I build can scale efficiently over time.
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
