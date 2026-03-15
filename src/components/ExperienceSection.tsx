import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import './ExperienceSection.css';

const experienceData = [
  {
    id: 1,
    role: 'Junior Web Developer Intern (OJT)',
    company: 'WebMakerPH',
    period: '2026 - Present',
    description: 'Technical lead for BookNGo project.',
  }
];

const educationData = [
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Engineering',
    institution: 'LSPU SPCC',
    period: '2022 - Present',
    description: 'Core focus on software engineering, hardware architecture, and full-stack development.',
  }
];

// A separate component for each column to track its Scroll Progress for the line drawing
const TimelineColumn = ({ 
  title, 
  icon: Icon, 
  data, 
  delay = 0 
}: { 
  title: string, 
  icon: React.ElementType, 
  data: any[],
  delay?: number 
}) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: columnRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  return (
    <div className="timeline-column" ref={columnRef}>
      <motion.div
        className="timeline-header"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
      >
        <Icon className="timeline-icon-main" />
        <h2 className="timeline-title">{title}</h2>
      </motion.div>

      <div className="timeline-items">
        {/* Animated Line Background */}
        <div className="timeline-line-base"></div>
        <motion.div 
          className="timeline-line-active"
          style={{ scaleY: pathLength }}
        />

        {data.map((item, index) => (
          <motion.div
            className="timeline-card"
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: delay + (index * 0.15), ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated Dot synced to card reveal */}
            <motion.div 
              className="timeline-dot"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: delay + (index * 0.15) + 0.2 }}
            />
            
            <div className="timeline-period">
              <Calendar size={14} />
              <span>{item.period}</span>
            </div>
            <h3 className="timeline-role">{item.role || item.degree}</h3>
            <h4 className="timeline-entity">{item.company || item.institution}</h4>
            <p className="timeline-description">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section className="experience-section section-padding" id="experience">
      <div className="container">
        <div className="experience-grid">
          <TimelineColumn 
            title="Experience" 
            icon={Briefcase} 
            data={experienceData} 
            delay={0} 
          />
          <TimelineColumn 
            title="Education" 
            icon={GraduationCap} 
            data={educationData} 
            delay={0.2} 
          />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
