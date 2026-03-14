import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import './ExperienceSection.css';

const experienceData = [
  {
    id: 1,
    role: 'Senior Software Engineer',
    company: 'TechFlow Solutions',
    period: '2022 - Present',
    description: 'Led the development of a high-performance analytics dashboard using React and Node.js. Optimized database queries resulting in a 40% reduction in load times.',
  },
  {
    id: 2,
    role: 'Full-Stack Developer',
    company: 'Innovate Digital',
    period: '2019 - 2022',
    description: 'Built scalable microservices for e-commerce clients. Implemented CI/CD pipelines and mentored junior engineers on testing best practices.',
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'Creative Web Agency',
    period: '2017 - 2019',
    description: 'Developed responsive, accessible, and highly animated single-page applications for high-profile client campaigns.',
  }
];

const educationData = [
  {
    id: 1,
    degree: 'B.S. Computer Science',
    institution: 'University of Technology',
    period: '2013 - 2017',
    description: 'Specialization in Software Engineering and Distributed Systems. Graduated with Honors.',
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
