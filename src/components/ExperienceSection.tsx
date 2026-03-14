import { motion } from 'framer-motion';
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

const ExperienceSection = () => {
  return (
    <section className="experience-section section-padding" id="experience">
      <div className="container">

        <div className="experience-grid">
          {/* Experience Column */}
          <div className="timeline-column">
            <motion.div
              className="timeline-header"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Briefcase className="timeline-icon-main" />
              <h2 className="timeline-title">Experience</h2>
            </motion.div>

            <div className="timeline-items">
              {experienceData.map((item, index) => (
                <motion.div
                  className="timeline-card"
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="timeline-period">
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </div>
                  <h3 className="timeline-role">{item.role}</h3>
                  <h4 className="timeline-entity">{item.company}</h4>
                  <p className="timeline-description">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="timeline-column">
            <motion.div
              className="timeline-header"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GraduationCap className="timeline-icon-main" />
              <h2 className="timeline-title">Education</h2>
            </motion.div>

            <div className="timeline-items">
              {educationData.map((item, index) => (
                <motion.div
                  className="timeline-card"
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.15) }}
                >
                  <div className="timeline-period">
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </div>
                  <h3 className="timeline-role">{item.degree}</h3>
                  <h4 className="timeline-entity">{item.institution}</h4>
                  <p className="timeline-description">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
