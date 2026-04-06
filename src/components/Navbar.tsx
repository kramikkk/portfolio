import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Youtube, Instagram, Linkedin, Github, Download } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { title: "Home", href: "#home", sectionId: "home" },
  { title: "Skills", href: "#expertise", sectionId: "expertise" },
  { title: "Projects", href: "#work", sectionId: "work" },
  { title: "Experience", href: "#experience", sectionId: "experience" },
  { title: "Contact", href: "#contact", sectionId: "contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  // Hide nav on scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // Auto-reveal if menu is open or at top of page
    if (isOpen || latest <= 100) {
      setHidden(false);
      return;
    }

    if (previous && latest > previous) {
      setHidden(true); // scrolling down
    } else {
      setHidden(false); // scrolling up
    }
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.sectionId);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Prevent scrolling when menu is open and fix layout shift from missing scrollbar
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  // Animation variants
  const menuVariants = {
    closed: {
      clipPath: "inset(0% 0% 100% 0%)",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number], // Custom Awwwards ease
        delay: 0.2 // Wait for text to disappear
      }
    },
    open: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
      }
    }
  };

  const linkWrapperVariants = {
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    },
    open: {
      transition: { delayChildren: 0.3, staggerChildren: 0.1 }
    }
  };

  const linkItemVariants = {
    closed: {
      y: "120%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    },
    open: {
      y: "0%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }
  };

  const fadeVariants = {
    closed: { opacity: 0, y: 20, transition: { duration: 0.5 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] } }
  };

  // Wrapper variants for the entire bottom footer section to control delay
  const footerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.6, staggerChildren: 0.1 } }
  };

  return (
    <>
      <motion.header
        className="minimal-header"
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="container">
          <div className="header-inner">
            <div className="logo-container">
              <motion.a
                href="#"
                className="logo"
                onClick={closeMenu}
                initial="initial"
                whileHover="hover"
                animate={isOpen ? "open" : "initial"}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
              >
                <motion.span
                  variants={{
                    initial: { color: "#ffffff" },
                    hover: { color: "var(--accent-color)" },
                    open: { color: "var(--accent-color)" }
                  }}
                >
                  Kramik
                </motion.span>
                <motion.span
                  className="dot"
                  variants={{
                    initial: { color: "var(--accent-color)", x: 0 },
                    hover: { color: "#ffffff", x: 4 },
                    open: { color: "#ffffff", x: 4 }
                  }}
                >
                  .
                </motion.span>
              </motion.a>
            </div>

            <motion.button
              className="menu-toggle"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="full-page-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              animate={{ color: isOpen ? "var(--accent-color)" : "#ffffff" }}
              whileHover={{ color: "var(--accent-color)" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
            >
              <div className={`menu-text ${isOpen ? 'is-open' : ''}`}>
                <span className="text-open">Menu</span>
                <span className="text-close">Close</span>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="full-page-menu"
            className="full-page-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            data-lenis-prevent="true"
          >
            <div className="menu-background"></div>

            <div className="container menu-container">
              <div className="menu-content">
                <nav className="menu-nav">
                  <motion.ul
                    className="menu-links"
                    variants={linkWrapperVariants}
                  >
                    {navLinks.map((link, i) => (
                      <li key={i} className="menu-link-item">
                        <div className="menu-link-overflow">
                          <motion.a
                            href={link.href}
                            variants={linkItemVariants}
                            onClick={closeMenu}
                            className={activeSection === link.sectionId ? 'is-active' : ''}
                          >
                            <span className="menu-link-num">0{i + 1}</span>
                            <div className="menu-link-text-wrapper">
                              <span className="menu-link-text-original">{link.title}</span>
                              <span className="menu-link-text-copy">{link.title}</span>
                            </div>
                          </motion.a>
                        </div>
                      </li>
                    ))}
                  </motion.ul>
                </nav>

                <motion.div className="menu-footer" variants={footerVariants}>
                  <motion.div className="menu-socials" variants={fadeVariants}>
                    <span>Socials</span>
                    <div className="social-links">
                      <a href="https://github.com/kramikkk" target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
                      <a href="https://www.linkedin.com/in/kramikkk/" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
                      <a href="https://www.instagram.com/kramik_/" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                      <a href="https://www.youtube.com/@kramik-code" target="_blank" rel="noopener noreferrer"><Youtube size={20} /></a>
                    </div>
                  </motion.div>

                  <motion.div className="menu-resume" variants={fadeVariants}>
                    <span>Resume</span>
                    <a href="/Mark-Jeric-Exconde-Resume.pdf" download className="resume-download-link">
                      Download CV <Download size={18} />
                    </a>
                  </motion.div>

                  <motion.div className="menu-contact" variants={fadeVariants}>
                    <span>Get in touch</span>
                    <a href="mailto:mrkjrc.xcnd@gmail.com" className="email-link">mrkjrc.xcnd@gmail.com</a>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
