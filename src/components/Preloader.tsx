import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import './Preloader.css';

interface PreloaderProps {
  onLoadComplete: () => void;
  onHidden?: () => void;
  totalFrames?: number;
}

const LETTERS = ['K', 'R', 'A', 'M', 'I', 'K'];

const STAGGER_CHILDREN = 0.08;
const DELAY_CHILDREN = 0.1;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: DELAY_CHILDREN,
    },
  },
};

const containerVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

const letterVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const letterVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
      delay: LETTERS.length * STAGGER_CHILDREN + DELAY_CHILDREN,
    },
  },
};

const dotVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
};

function Preloader({ onLoadComplete, onHidden, totalFrames = 144 }: PreloaderProps) {
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let loaded = 0;

    const handleSettled = () => {
      loaded += 1;
      setLoadedFrames(loaded);
      if (loaded === totalFrames) {
        setTimeout(() => setIsDone(true), 100);
      }
    };

    const imagePaths = Array.from({ length: totalFrames }, (_, i) =>
      `/frames/frame_${i.toString().padStart(3, '0')}_delay-0.041s.webp`
    );

    imagePaths.forEach((src) => {
      const img = new Image();
      img.onload = handleSettled;
      img.onerror = handleSettled;
      img.src = src;
    });
  }, [totalFrames]);

  useEffect(() => {
    if (isDone) onLoadComplete();
  }, [isDone, onLoadComplete]);

  const progress = Math.min(100, Math.round((loadedFrames / totalFrames) * 100));
  const displayProgress = String(progress).padStart(2, '0');

  return (
    <AnimatePresence onExitComplete={onHidden}>
      {!isDone && (
        <motion.div
          className="preloader"
          initial={{ y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: '-100%' }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : { duration: 1, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
          }
          role="status"
          aria-label="Loading portfolio"
        >
          <motion.div
            className="preloader-word"
            variants={prefersReducedMotion ? containerVariantsReduced : containerVariants}
            initial="hidden"
            animate="visible"
          >
            {LETTERS.map((letter, i) => (
              <span key={`${letter}-${i}`} className="letter-clip">
                <motion.span
                  className="letter"
                  variants={prefersReducedMotion ? letterVariantsReduced : letterVariants}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
            <motion.span
              className="preloader-dot"
              variants={prefersReducedMotion ? dotVariantsReduced : dotVariants}
            />
          </motion.div>

          <div
            className="preloader-counter"
            aria-live="polite"
            aria-atomic="true"
          >
            {displayProgress}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
