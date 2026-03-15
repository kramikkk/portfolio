import { motion } from 'framer-motion';
import { Linkedin, Dribbble, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="footer-brand">
            <div className="footer-logo">
              Kramik<span className="dot">.</span>
            </div>
            <p className="footer-description">
              Creating intuitive digital experiences, striking brand identities, and cinematic product animations.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#expertise">Expertise</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Connect</h4>
            <ul className="footer-links">
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Dribbble</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="copyright">
            &copy; {new Date().getFullYear()} Mark Jeric B. Exconde. All rights reserved.
          </div>
          <div className="footer-socials">
            <a href="#" className="social-icon-small"><Linkedin size={18} /></a>
            <a href="#" className="social-icon-small"><Dribbble size={18} /></a>
            <a href="#" className="social-icon-small"><Instagram size={18} /></a>
            <a href="#" className="social-icon-small"><Twitter size={18} /></a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
