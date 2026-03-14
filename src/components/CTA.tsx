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
            Whether you need a compelling brand identity, a sophisticated web dashboard, or a dynamic product animation—I'm ready to bring your vision to life.
          </p>
          
          <div className="cta-buttons">
            <button className="btn btn-primary">
              <span>Start a Project</span>
              <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary">
              <FileText size={20} />
              <span>View Resume</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
