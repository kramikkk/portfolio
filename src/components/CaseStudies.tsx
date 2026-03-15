import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './CaseStudies.css';

const projects = [
  {
    id: 1,
    title: 'Book-N-Go',
    category: 'Business Web Platform',
    description: 'Professional reservation system for small businesses, featuring complex scheduling logic and high-concurrency handling.',
    image: '/images/bookngo.png',
    tech: ['TypeScript', 'React', 'Tailwind', 'Next.js']
  },
  {
    id: 2,
    title: 'Smart Shoe Care',
    category: 'IoT & AI Solution',
    description: 'An automated IoT solution for shoe cleaning, sterilization, and drying with Google GenAI material classification.',
    image: '/images/shoes.png',
    tech: ['Next.js', 'Google GenAI', 'ESP32', 'WebSockets']
  },
  {
    id: 3,
    title: 'VitaLink AI',
    category: 'Health-Tech Platform',
    description: 'A full-stack wellness monitoring system featuring real-time telemetry from ESP32 sensors and Next.js analytics.',
    image: '/images/vitalink.png',
    tech: ['React', 'Next.js', 'C++', 'Node.js']
  },
  {
    id: 4,
    title: 'Conan AI Cam',
    category: 'AI & Embedded System',
    description: 'Embedded vision system powered by TinyML for real-time object detection on ESP32-CAM with TFT display.',
    image: '/images/conan.png',
    tech: ['C++', 'TinyML', 'ESP32-CAM', 'Computer Vision']
  },
  {
    id: 5,
    title: 'SLT Translate',
    category: 'Mobile App / ML',
    description: 'Accessibility-focused mobile app providing real-time Sign Language to Text and Text to Sign translation.',
    image: '/images/slt.png',
    tech: ['Kotlin', 'Android', 'TensorFlow', 'Jetpack Compose']
  },
  {
    id: 6,
    title: 'Stack Wars',
    category: 'IoT Game',
    description: 'Competitive two-player LED matrix game with custom joystick hardware and Arduino-based real-time logic.',
    image: '/images/stack.png',
    tech: ['C++', 'Arduino', 'LED Matrix', 'Hardware Design']
  },
  {
    id: 7,
    title: 'COCO Robot',
    category: 'Robotics',
    description: 'Autonomous smart robot featuring intelligent navigation, obstacle avoidance, and sensor-based environmental interaction.',
    image: '/images/robot.png',
    tech: ['C++', 'Arduino', 'Robotics', 'Sensor Fusion']
  },
  {
    id: 8,
    title: 'Smart Face Shield',
    category: 'Health Tech / IoT',
    description: 'Wearable health-tech device with non-contact infrared temperature scanning and ultrasonic proximity monitoring.',
    image: '/images/shield.png',
    tech: ['Arduino', 'C++', 'IoT', 'Health Tech']
  }
];

const CaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85.5%"]);

  return (
    <section ref={containerRef} className="case-studies" id="work">
      <div className="horizontal-sticky-wrapper">
        <div className="horizontal-header container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-badge">SELECTED WORK</div>
            <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="projects-horizontal-track">
          {projects.map((project, index) => (
            <div key={project.id} className="horizontal-project-card">
              <div className="project-card-inner">
                <div className="project-index">0{index + 1}</div>
                
                <div className="project-image-wrapper">
                  <motion.div 
                    className="image-reveal-mask"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-image-horizontal"
                    />
                  </motion.div>
                </div>

                <div className="project-details-horizontal">
                  <div className="project-cat-row">
                    <span className="project-category-tag">{project.category}</span>
                    <div className="project-tech-tags">
                      {project.tech.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                  
                  <h3 className="project-title-huge">{project.title}</h3>
                  <p className="project-description-large">{project.description}</p>
                  
                  <motion.a 
                    href="#" 
                    className="view-project-link"
                    whileHover={{ x: 10 }}
                  >
                    Explore Case Study <ArrowUpRight size={24} />
                  </motion.a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
