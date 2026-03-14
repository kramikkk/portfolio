import { motion } from 'framer-motion';
import { PenTool, ActivitySquare, Video, Globe } from 'lucide-react';
import './ExpertiseSection.css';

const expertiseData = [
  {
    id: '01',
    title: 'Brand Identity',
    description: 'Memorable, versatile logo design and visual systems for modern businesses looking to stand out.',
    icon: <PenTool size={32} />
  },
  {
    id: '02',
    title: 'IoT & Health Tech UI',
    description: 'Intuitive dashboards and interfaces for smart devices, wearables, and complex analytical tools.',
    icon: <ActivitySquare size={32} />
  },
  {
    id: '03',
    title: 'Product Animation',
    description: 'Dynamic, detailed cinematic sequences for footwear, tech hardware, and e-commerce platforms.',
    icon: <Video size={32} />
  },
  {
    id: '04',
    title: 'Web Systems',
    description: 'Streamlined, robust interfaces for booking, reservation platforms, and internal business tools.',
    icon: <Globe size={32} />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const ExpertiseSection = () => {
  return (
    <section className="expertise-section section-padding" id="expertise">
      <div className="container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Core <span className="highlight">Expertise</span></h2>
          <p className="section-subtitle">A comprehensive suite of design disciplines tailored for the future.</p>
        </motion.div>

        <motion.div 
          className="expertise-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {expertiseData.map((item) => (
            <motion.div 
              className="expertise-card" 
              key={item.id}
              variants={itemVariants}
            >
              <div className="card-header">
                <span className="card-index">#{item.id}</span>
                <div className="card-icon">{item.icon}</div>
              </div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
