import { useRef } from 'react';
import { motion, useInView, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import './SkillsSection.css';

const row1 = [
  { name: 'Next.js',       slug: 'nextdotjs',   color: 'white'   },
  { name: 'TypeScript',    slug: 'typescript',  color: '#3178C6' },
  { name: 'React',         slug: 'react',       color: '#61DAFB' },
  { name: 'Tailwind CSS',  slug: 'tailwindcss', color: '#06B6D4' },
  { name: 'Framer Motion', slug: 'framer',      color: '#0055FF' },
  { name: 'GSAP',          slug: 'greensock',   color: '#88CE02' },
  { name: 'JavaScript',    slug: 'javascript',  color: '#F7DF1E' },
  { name: 'HTML5',         slug: 'html5',       color: '#E34F26' },
  { name: 'CSS3',          slug: 'css3',        color: '#1572B6' },
  { name: 'Shadcn UI',     slug: 'shadcnui',    color: 'white'   },
  { name: 'Node.js',       slug: 'nodedotjs',   color: '#339933' },
  { name: 'FastAPI',       slug: 'fastapi',     color: '#009688' },
  { name: 'Prisma',        slug: 'prisma',      color: 'white'   },
  { name: 'PostgreSQL',    slug: 'postgresql',  color: '#4169E1' },
  { name: 'Vercel',        slug: 'vercel',      color: 'white'   },
];

const row2 = [
  { name: 'Supabase', slug: 'supabase',   color: '#3ECF8E' },
  { name: 'SQLite',   slug: 'sqlite',     color: '#003B57' },
  { name: 'NeonDB',   slug: 'neon',       color: '#00E599' },
  { name: 'Python',   slug: 'python',     color: '#3776AB' },
  { name: 'Kotlin',   slug: 'kotlin',     color: '#7F52FF' },
  { name: 'Arduino',  slug: 'arduino',    color: '#00979D' },
  { name: 'ESP32',    slug: 'espressif',  color: '#E7352C' },
  { name: 'Git',      slug: 'git',        color: '#F05032' },
  { name: 'GitHub',   slug: 'github',     color: 'white'   },
  { name: 'Render',   slug: 'render',     color: '#46E3B7' },
  { name: 'SketchUp', slug: 'sketchup',   color: '#005F9E' },
];

const skillCategories = [
  {
    index: '01',
    title: 'Frontend Development',
    skills: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Shadcn UI', 'Framer Motion', 'GSAP']
  },
  {
    index: '02',
    title: 'Backend & Data',
    skills: ['Node.js', 'FastAPI', 'Python', 'Prisma', 'PostgreSQL', 'Supabase', 'SQLite', 'NeonDB', 'Better-Auth', 'WebSocket']
  },
  {
    index: '03',
    title: 'Embedded & Mobile',
    skills: ['Arduino', 'ESP32', 'Kotlin', 'SquareLine Studio', 'MIT App Inventor']
  },
  {
    index: '04',
    title: 'Intelligence & Tools',
    skills: ['Machine Learning', 'Git/GitHub', 'Vercel', 'Render', 'SketchUp 3D']
  }
];

const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);

  const renderMarquee = (items: typeof row1, reverse: boolean = false) => {
    const doubled = [...items, ...items];
    return (
      <motion.div
        className={`marquee-track ${reverse ? 'reverse' : ''}`}
        style={{ skewX: skewVelocity }}
      >
        {doubled.map((item, idx) => (
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
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-badge">MY ARSENAL</div>
          <h2 className="section-title">Skills & <span className="highlight">Tech Stack</span></h2>
        </motion.div>
      </div>

      {/* ── Marquee rows ── */}
      <motion.div
        className="marquee-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="marquee-wrapper">{renderMarquee(row1, false)}</div>
        <div className="marquee-wrapper mt-4">{renderMarquee(row2, true)}</div>
        <div className="fade-left" />
        <div className="fade-right" />
      </motion.div>

      {/* ── Category table ── */}
      <div className="container expertise-content">
        <div className="skills-category-list">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              className="skill-row"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.35 + idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Accent bar on hover */}
              <div className="skill-row-accent" aria-hidden="true" />

              <span className="skill-row-num" aria-hidden="true">{category.index}</span>

              <div className="skill-row-info">
                <h3 className="skill-row-title">{category.title}</h3>
              </div>

              <div className="skill-row-tags">
                {category.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
