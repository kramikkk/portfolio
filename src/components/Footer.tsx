import { Linkedin, Dribbble, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
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
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {new Date().getFullYear()} Kramik. All rights reserved.
          </div>
          <div className="footer-socials">
            <a href="#" className="social-icon-small"><Linkedin size={18} /></a>
            <a href="#" className="social-icon-small"><Dribbble size={18} /></a>
            <a href="#" className="social-icon-small"><Instagram size={18} /></a>
            <a href="#" className="social-icon-small"><Twitter size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
