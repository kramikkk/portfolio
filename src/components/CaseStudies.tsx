import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './CaseStudies.css';

const projects = [
  {
    id: 1,
    title: 'VitaLink AI',
    category: 'Health & IoT Dashboard',
    description: 'Health and activity dashboard interface for student wearable sensors.',
    image: '/images/vitalink.png',
  },
  {
    id: 2,
    title: 'Smart Shoe Care System',
    category: 'App & Branding',
    description: 'Branding and login interface for an IoT cleaning device.',
    image: '/images/shoes.png',
  },
  {
    id: 3,
    title: 'BookNGo',
    category: 'Web System UI/UX',
    description: 'Appointment and reservation system UI/UX with elegant scheduling workflows.',
    image: '/images/bookngo.png',
  },
  {
    id: 4,
    title: 'Product Motion',
    category: 'Animation & 3D',
    description: 'Canvas, rubber, and mesh sneaker photography and cinematic animation frames.',
    image: '/images/sneaker.png',
  }
];

const CaseStudies = () => {
  return (
    <section className="case-studies section-padding" id="work">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Selected <span className="highlight">Case Studies</span></h2>
          <p className="section-subtitle">A deeper look at full-scale product implementations.</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              className="project-card" 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-overlay">
                  <div className="project-view-btn">
                    <span>View Project</span>
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
              <div className="project-info">
                <div className="project-category">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
