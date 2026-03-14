import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: "What is your process for designing IoT interfaces?",
    answer: "My sequence begins with deep user research to understand the specific environment where the device will be used. From there, I develop a component library that ensures clear state communication (connected, error, syncing), followed by high-fidelity prototyping and user testing. The goal is always extreme clarity under complex conditions."
  },
  {
    question: "Are you available for freelance branding projects?",
    answer: "Yes, I take on a select number of freelance branding projects each quarter. I partner closely with founders to build comprehensive identity systems—not just a logo, but the entire visual language for digital presence."
  },
  {
    question: "What tools do you use for product animation?",
    answer: "My primary stack includes Cinema 4D and Redshift for 3D modeling and rendering, paired with After Effects for compositing and micro-animations. For UI-specific motion, I rely heavily on Figma and Framer."
  },
  {
    question: "How do you handle developer handoff?",
    answer: "I believe design doesn't end until the product is shipped. I provide meticulously organized Figma files, detailed motion specs, and comprehensive component documentation. I'm also comfortable diving into front-end code (CSS/React) to ensure the final implementation matches the design intent perfectly."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section section-padding" id="faq">
      <div className="container faq-container">
        <motion.div 
          className="section-header left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Frequently Asked <span className="highlight">Questions</span></h2>
          <p className="section-subtitle">Common inquiries about my workflow and availability.</p>
        </motion.div>

        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <motion.div 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    className="faq-answer-wrapper"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
