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
            <div className="about-image-container">
              <img src="/images/profile-pic.jpg" alt="Mark Jeric B. Exconde" className="about-profile-image" />
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
              As a dedicated Computer Engineering student and aspiring software engineer, my mission is to build digital products that are highly functional, fast, and scalable. I am constantly expanding my foundation in full-stack architecture and modern web technologies.
            </p>
            <p className="about-description">
              Whether working on academic projects or gaining real-world experience through my OJT, every line of code matters. I focus on clean architecture and continuous learning to ensure the software I build can scale efficiently.
            </p>

            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">2+</span>
                <span className="stat-label">Months Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">7+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Academic Awards</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
