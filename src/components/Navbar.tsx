import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Dribbble } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { title: "Home", href: "#" },
  { title: "Expertise", href: "#expertise" },
  { title: "Work", href: "#work" },
  { title: "Experience", href: "#experience" },
  { title: "Contact", href: "#contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
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
                animate={isOpen ? { color: "var(--accent-color)" } : { color: "#ffffff" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
              >
                Kramik<motion.span 
                  className="dot"
                  animate={isOpen ? { color: "#ffffff", display: "inline-block", x: 4 } : { color: "var(--accent-color)", display: "inline-block", x: 0 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
                >.</motion.span>
              </motion.a>
            </div>
            
            <button className="menu-toggle" onClick={toggleMenu}>
              <div className={`menu-text ${isOpen ? 'is-open' : ''}`}>
                <span className="text-open">Menu</span>
                <span className="text-close">Close</span>
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
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
                          >
                            <span className="menu-link-num">0{i + 1}</span>
                            {link.title}
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
                      <a href="#"><Twitter size={20} /></a>
                      <a href="#"><Instagram size={20} /></a>
                      <a href="#"><Linkedin size={20} /></a>
                      <a href="#"><Dribbble size={20} /></a>
                    </div>
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
