import { useRef } from 'react';
import { motion, useInView, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import './ExpertiseSection.css';

const row1 = [
  { name: 'Next.js', slug: 'nextdotjs', color: 'white' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
  { name: 'React', slug: 'react', color: '#61DAFB' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4' },
  { name: 'Vite', slug: 'vite', color: '#646CFF' },
  { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
  { name: 'HTML5', slug: 'html5', color: '#E34F26' },
  { name: 'CSS3', slug: 'css3', color: '#1572B6' },
  { name: 'Vercel', slug: 'vercel', color: 'white' },
  { name: 'Render', slug: 'render', color: '#46E3B7' },
];

const row2 = [
  { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
  { name: 'Supabase', slug: 'supabase', color: '#3ECF8E' },
  { name: 'SQLite', slug: 'sqlite', color: '#003B57' },
  { name: 'NeonDB', slug: 'neon', color: '#00E599' },
  { name: 'Python', slug: 'python', color: '#3776AB' },
  { name: 'Kotlin', slug: 'kotlin', color: '#7F52FF' },
  { name: 'Arduino', slug: 'arduino', color: '#00979D' },
  { name: 'ESP32', slug: 'espressif', color: '#E7352C' },
  { name: 'Git', slug: 'git', color: '#F05032' },
  { name: 'GitHub', slug: 'github', color: 'white' },
];

const ExpertiseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Awwwards-style Scroll Velocity skew effect
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Transform velocity into a skew amount (max 10 degrees)
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);

  // Helper to render the infinite scrolling track
  const renderMarquee = (items: typeof row1, reverse: boolean = false) => {
    // Duplicate the array to create a seamless looping effect
    const doubledItems = [...items, ...items];

    return (
      <motion.div
        className={`marquee-track ${reverse ? 'reverse' : ''}`}
        style={{ skewX: skewVelocity }}
      >
        {doubledItems.map((item, idx) => (
          <div className="tech-card" key={`${item.name}-${idx}`}>
            <img
              src={`https://cdn.simpleicons.org/${item.slug}/${item.color.replace('#', '')}`}
              alt={item.name}
              className="tech-icon"
              loading="lazy"
            />
            <span className="tech-name">{item.name}</span>
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <section className="expertise-section section-padding" id="expertise" ref={containerRef}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-badge" style={{ margin: "0 auto 2rem" }}>MY ARSENAL</div>
          <h2 className="section-title">Skills & <span className="highlight">Tech Stack</span></h2>
          <p className="section-subtitle">A robust collection of modern frameworks, databases, and tooling.</p>
        </motion.div>
      </div>

      <motion.div
        className="marquee-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="marquee-wrapper">
          {renderMarquee(row1, false)}
        </div>
        <div className="marquee-wrapper mt-4">
          {renderMarquee(row2, true)}
        </div>

        {/* Gradient fades for the edges of the screen */}
        <div className="fade-left"></div>
        <div className="fade-right"></div>
      </motion.div>
    </section>
  );
};

export default ExpertiseSection;
