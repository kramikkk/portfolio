import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

interface PreloaderProps {
  onLoadComplete: () => void;
  onHidden?: () => void;
  totalFrames?: number;
}

const LETTERS = ['K', 'R', 'A', 'M', 'I', 'K'];

const STAGGER_CHILDREN = 0.08;
const DELAY_CHILDREN = 0.1;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: DELAY_CHILDREN,
    },
  },
};

const letterVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
      delay: LETTERS.length * STAGGER_CHILDREN + DELAY_CHILDREN,
    },
  },
};

function Preloader({ onLoadComplete, onHidden, totalFrames = 144 }: PreloaderProps) {
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isDone, setIsDone] = useState(false);

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
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="preloader-word"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {LETTERS.map((letter, i) => (
              <span key={`${letter}-${i}`} className="letter-clip">
                <motion.span className="letter" variants={letterVariants}>
                  {letter}
                </motion.span>
              </span>
            ))}
            <motion.span className="preloader-dot" variants={dotVariants} />
          </motion.div>

          <div className="preloader-counter">
            {displayProgress}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
