import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
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
              <span>Email Me</span>
              <ArrowRight size={20} />
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
