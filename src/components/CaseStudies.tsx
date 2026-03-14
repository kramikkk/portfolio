import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './CaseStudies.css';

const projects = [
  {
    id: 1,
    title: 'VitaLink Analytics Platform',
    category: 'React & Node.js Dashboard',
    description: 'Real-time health telemetry dashboard built with WebSockets, React, and a massively scalable Node microservice backend.',
    image: '/images/vitalink.png',
  },
  {
    id: 2,
    title: 'SmartCare Control Hub',
    category: 'Progressive Web App',
    description: 'Fully responsive PWA providing a secure OAuth login flow and device management for IoT appliances.',
    image: '/images/shoes.png',
  },
  {
    id: 3,
    title: 'BookNGo Architecture',
    category: 'Full-Stack Booking Engine',
    description: 'High-concurrency reservation system featuring PostgreSQL scheduling, Redis caching, and a Next.js frontend.',
    image: '/images/bookngo.png',
  },
  {
    id: 4,
    title: 'E-Commerce 3D Configurator',
    category: 'WebGL & Three.js',
    description: 'Interactive 3D sneaker configurator blending React state management with complex WebGL rendering pipelines.',
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
          <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
          <p className="section-subtitle">Real-world systems prioritizing performance, scalability, and UX.</p>
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
