import { motion } from 'framer-motion';
import { Code, Database, Server, Cpu } from 'lucide-react';
import './ExpertiseSection.css';

const expertiseData = [
  {
    id: '01',
    title: 'Frontend Architecture',
    description: 'Building responsive, highly optimized SPA structures using React, Next.js, and modern state management tools.',
    icon: <Code size={32} />
  },
  {
    id: '02',
    title: 'Backend Systems',
    description: 'Architecting scalable server-side logic and microservices with Node.js, Express, and high-performance routing.',
    icon: <Server size={32} />
  },
  {
    id: '03',
    title: 'Database Design',
    description: 'Designing normalized schemas, complex aggregations, and performance-tuned data pipelines using SQL and NoSQL databases.',
    icon: <Database size={32} />
  },
  {
    id: '04',
    title: 'DevOps & CI/CD',
    description: 'Streamlining deployment pipelines with Docker, automated testing, and cloud infrastructure management for robust reliability.',
    icon: <Cpu size={32} />
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
          <h2 className="section-title">Skills & <span className="highlight">Tech Stack</span></h2>
          <p className="section-subtitle">A comprehensive suite of programming disciplines tailored for highly scalable solutions.</p>
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
