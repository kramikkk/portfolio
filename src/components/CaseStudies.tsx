import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './CaseStudies.css';

const projects = [
  {
    id: 1,
    title: 'Book-N-Go',
    role: 'Lead Full-Stack Developer',
    description: 'Professional reservation system for small businesses, featuring complex scheduling logic and high-concurrency handling.',
    image: '/images/bookngo.png',
    tech: ['TypeScript', 'React', 'Tailwind', 'Next.js'],
    demoUrl: '#',
    projectUrl: 'https://github.com/kramikkk/book-n-go'
  },
  {
    id: 2,
    title: 'SSCM',
    role: 'System Architect & IoT Lead',
    description: 'An automated IoT solution for shoe cleaning, sterilization, and drying with Google GenAI material classification.',
    image: '/images/shoes.png',
    tech: ['Next.js', 'Google GenAI', 'ESP32', 'WebSockets'],
    demoUrl: '#',
    projectUrl: 'https://github.com/kramikkk/smart-shoe-care-machine'
  },
  {
    id: 3,
    title: 'VitaLink AI',
    role: 'Full-Stack & Hardware Engineer',
    description: 'A full-stack wellness monitoring system featuring real-time telemetry from ESP32 sensors and Next.js analytics.',
    image: '/images/vitalink.png',
    tech: ['React', 'Next.js', 'C++', 'Node.js'],
    demoUrl: 'https://vitalink-ai-frontend.vercel.app/',
    projectUrl: 'https://github.com/kramikkk/vitalink-ai'
  },
  {
    id: 4,
    title: 'Conan AI Cam',
    role: 'AI & Embedded Developer',
    description: 'Embedded vision system powered by TinyML for real-time object detection on ESP32-CAM with TFT display.',
    image: '/images/conan.png',
    tech: ['C++', 'TinyML', 'ESP32-CAM', 'Computer Vision'],
    projectUrl: 'https://github.com/kramikkk/conan-ai-cam'
  },
  {
    id: 6,
    title: 'Stack Wars',
    role: 'Hardware & Game Developer',
    description: 'Competitive two-player LED matrix game with custom joystick hardware and Arduino-based real-time logic.',
    image: '/images/stack.png',
    tech: ['C++', 'Arduino', 'LED Matrix', 'Hardware Design'],
    projectUrl: 'https://github.com/kramikkk/stack-wars'
  },
  {
    id: 7,
    title: 'COCO Robot',
    role: 'Robotics Engineer',
    description: 'Autonomous smart robot featuring intelligent navigation, obstacle avoidance, and sensor-based environmental interaction.',
    image: '/images/robot.png',
    tech: ['C++', 'Arduino', 'Robotics', 'Sensor Fusion'],
    projectUrl: 'https://github.com/kramikkk/coco'
  },
  {
    id: 5,
    title: 'SLT App',
    role: 'Mobile & ML Developer',
    description: 'Accessibility-focused mobile app providing real-time Sign Language to Text and Text to Sign translation.',
    image: '/images/slt.png',
    tech: ['Kotlin', 'Android', 'TensorFlow', 'Jetpack Compose'],
    projectUrl: 'https://github.com/kramikkk/slt-app'
  },
  {
    id: 8,
    title: 'SFS',
    role: 'IoT Developer',
    description: 'Wearable health-tech device with non-contact infrared temperature scanning and ultrasonic proximity monitoring.',
    image: '/images/shield.png',
    tech: ['Arduino', 'C++', 'IoT', 'Health Tech'],
    projectUrl: 'https://github.com/kramikkk/smart-face-shield'
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
        <div className="container" style={{ position: 'absolute', top: '6%', left: 0, right: 0, zIndex: 10 }}>
          <div className="horizontal-header section-header right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="about-badge">SELECTED WORK</div>
              <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>

              {/* Pagination Dots */}
              <div className="project-pagination">
                {projects.map((_, index) => {
                  const start = index / projects.length;
                  const end = (index + 1) / projects.length;

                  return (
                    <ProjectPaginationDot
                      key={index}
                      progress={scrollYProgress}
                      range={[start, end]}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>
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
                    <span className="project-role-tag">{project.role}</span>
                    <div className="project-tech-tags">
                      {project.tech.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>

                  <h3 className="project-title-huge">{project.title}</h3>
                  <p className="project-description-large">{project.description}</p>

                  <div className="project-actions">
                    <motion.a
                      href={(project as any).projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-project-link"
                      whileHover={{ x: 10 }}
                    >
                      View Project <ArrowUpRight size={20} />
                    </motion.a>

                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="demo-project-link"
                        whileHover={{ x: 10 }}
                      >
                        Live Demo <ArrowUpRight size={20} />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Sub-component for individual dots to keep main component clean
const ProjectPaginationDot = ({ progress, range }: { progress: any, range: [number, number] }) => {
  const width = useTransform(progress, range, ["8px", "32px"], { clamp: true });
  const opacity = useTransform(progress, range, [0.3, 1], { clamp: true });
  const backgroundColor = useTransform(
    progress,
    range,
    ["rgba(255, 255, 255, 0.3)", "var(--accent-color)"],
    { clamp: true }
  );

  return (
    <motion.div
      className="pagination-dot"
      style={{
        width,
        opacity,
        backgroundColor
      }}
    />
  );
};

export default CaseStudies;
