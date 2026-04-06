import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, Youtube, ArrowUpRight, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Manila',
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Manila',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { icon: <Github size={20} />, label: 'GitHub', url: 'https://github.com/kramikkk' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/kramikkk/' },
    { icon: <Instagram size={20} />, label: 'Instagram', url: 'https://www.instagram.com/kramik_/' },
    { icon: <Youtube size={20} />, label: 'YouTube', url: 'https://www.youtube.com/@kramik-code' }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-bg-text">KRAMIK</div>

      <div className="container footer-container">
        <div className="footer-top">
          <motion.div {...fadeUp} className="footer-cta-block">
            <span className="footer-pretitle">HAVE A PROJECT IN MIND?</span>
            <h2 className="footer-big-title">LET'S <span className="highlight">CREATE</span></h2>

            <div className="footer-actions">
              <motion.a
                href="mailto:mrkjrc.xcnd@gmail.com"
                className="footer-mail-link"
                whileHover={{ x: 10 }}
              >
                Get in touch <ArrowUpRight size={24} />
              </motion.a>

              <motion.a
                href="/Resume-links.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-resume-link"
                whileHover={{ x: 10 }}
              >
                <FileText size={20} />
                Resume
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="footer-main-grid">
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="footer-grid-col"
          >
            <h4 className="footer-col-label">Navigation</h4>
            <nav className="footer-nav">
              <a href="#home">Home</a>
              <a href="#work">Featured Projects</a>
              <a href="#expertise">Arsenal</a>
              <a href="#experience">Experience</a>
            </nav>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="footer-grid-col"
          >
            <h4 className="footer-col-label">Socials</h4>
            <div className="footer-social-links">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-item"
                  whileHover={{ x: 5, color: 'var(--accent-color)' }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.3 }}
            className="footer-grid-col info-col"
          >
            <div className="footer-info-item">
              <h4 className="footer-col-label">Location</h4>
              <p>Manila, Philippines</p>
            </div>
            <div className="footer-info-item mt-4">
              <h4 className="footer-col-label">Local Time</h4>
              <p className="footer-time">{time} PHT</p>
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} Mark Jeric B. Exconde</p>
          </div>
          <div className="footer-credit">
            <p>Designed & Built by <span className="highlight">Kramik</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
