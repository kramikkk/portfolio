import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    quote: "Kramik elevated our entire smart shoe product launch. The interface design was not only beautiful but extremely intuitive for our first-time users.",
    name: "Sarah Jenkins",
    role: "Founder, Aurora Tech",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    quote: "The BookNGo system was a massive undertaking, but the UX solutions provided simplified complex scheduling into a seamless experience. Truly exceptional work.",
    name: "David Chen",
    role: "Lead Engineer",
    image: "https://i.pravatar.cc/150?u=david"
  },
  {
    id: 3,
    quote: "We needed someone who understood both the technical requirements of IoT and the aesthetic demands of premium branding. Kramik delivered exactly that.",
    name: "Elena Petrova",
    role: "Project Manager, VitaLink",
    image: "https://i.pravatar.cc/150?u=elena"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section section-padding" id="testimonials">
      <div className="container">
        <motion.div 
          className="section-header left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Client <span className="highlight">Testimonials</span></h2>
          <p className="section-subtitle">What ambitious founders and engineers say about working together.</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <motion.div 
              className="testimonial-card"
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Quote className="quote-icon" size={40} />
              <p className="quote-text">"{t.quote}"</p>
              
              <div className="client-info">
                <img src={t.image} alt={t.name} className="client-image" />
                <div className="client-details">
                  <h4 className="client-name">{t.name}</h4>
                  <p className="client-role">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
