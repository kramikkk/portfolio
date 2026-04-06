import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './ExperienceSection.css';

const experienceData = [
  {
    id: 1,
    role: 'Junior Web Developer Intern',
    label: 'OJT',
    company: 'RGRR WebMaker Philippines',
    location: 'Lucena City',
    period: 'Feb 2026',
    periodEnd: 'Mar 2026',
    description: 'Technical Lead for the BookNGo reservation system.',
  },
];

const educationData = [
  {
    id: 1,
    degree: 'B.S. Computer Engineering',
    institution: 'Laguna State Polytechnic University',
    location: 'San Pablo City Campus',
    period: '2022',
    periodEnd: 'Present',
    description: 'Core focus on software engineering, hardware architecture, and full-stack development.',
  },
];

interface EntryItem {
  id: number;
  role?: string;
  degree?: string;
  label?: string;
  company?: string;
  institution?: string;
  location: string;
  period: string;
  periodEnd: string;
  description: string;
}

const EditorialEntry = ({
  item,
  index,
  align,
}: {
  item: EntryItem;
  index: number;
  align: 'left' | 'right';
}) => (
  <motion.article
    className={`editorial-entry editorial-entry--${align}`}
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
  >
    <span className="editorial-index" aria-hidden="true">
      {String(index + 1).padStart(2, '0')}
    </span>

    <div className="editorial-body">
      <div className="editorial-meta">
        <span className="editorial-period">
          {item.period}<em>—</em>{item.periodEnd}
        </span>
        {item.label && <span className="editorial-badge">{item.label}</span>}
      </div>

      <h3 className="editorial-title">{item.role ?? item.degree}</h3>

      <p className="editorial-org">
        {item.company ?? item.institution}
        <span className="editorial-location"> · {item.location}</span>
      </p>

      <motion.div
        className="editorial-rule"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: index * 0.12 + 0.3 }}
      />

      <p className="editorial-desc">{item.description}</p>
    </div>
  </motion.article>
);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const ruleScaleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 80, damping: 20, restDelta: 0.001 }
  );

  return (
    <section className="exp-section" id="experience" ref={sectionRef}>
      <div className="container">

        {/* Section label row */}
        <motion.div
          className="exp-label-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="exp-label">Selected Record</span>
          <span className="exp-label-line" />
          <span className="exp-label">2022 – Present</span>
        </motion.div>

        {/* Main editorial grid */}
        <div className="exp-grid">

          {/* LEFT — Experience */}
          <div className="exp-col exp-col--left">
            <motion.h2
              className="exp-col-heading"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Experience
            </motion.h2>
            {experienceData.map((item, i) => (
              <EditorialEntry key={item.id} item={item} index={i} align="left" />
            ))}
          </div>

          {/* CENTER — animated vertical rule */}
          <div className="exp-divider" aria-hidden="true">
            <div className="exp-divider-track" />
            <motion.div
              className="exp-divider-fill"
              style={{ scaleY: ruleScaleY, transformOrigin: 'top center' }}
            />
          </div>

          {/* RIGHT — Education */}
          <div className="exp-col exp-col--right">
            <motion.h2
              className="exp-col-heading"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Education
            </motion.h2>
            {educationData.map((item, i) => (
              <EditorialEntry key={item.id} item={item} index={i} align="right" />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};


export default ExperienceSection;
