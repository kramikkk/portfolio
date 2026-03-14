import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

interface PreloaderProps {
  onLoadComplete: () => void;
  totalFrames?: number;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadComplete, totalFrames = 144 }) => {
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let loaded = 0;
    
    // Create an array of image paths
    const imagePaths = Array.from({ length: totalFrames }, (_, i) => 
      `/frames/frame_${i.toString().padStart(3, '0')}_delay-0.041s.webp`
    );

    // Load each image
    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded += 1;
        setLoadedFrames(loaded);
        if (loaded === totalFrames) {
          setTimeout(() => setIsDone(true), 800);
        }
      };
      img.onerror = () => {
        // Even if an image fails, progress it so we don't get stuck
        loaded += 1;
        setLoadedFrames(loaded);
        if (loaded === totalFrames) {
          setTimeout(() => setIsDone(true), 800);
        }
      };
    });
  }, [totalFrames]);

  useEffect(() => {
    if (isDone) {
      setTimeout(() => onLoadComplete(), 1000); 
    }
  }, [isDone, onLoadComplete]);

  const progress = Math.min(100, Math.round((loadedFrames / totalFrames) * 100));

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="preloader-content">
            <motion.div 
              className="monogram"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              K
            </motion.div>
            
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            
            <div className="progress-text">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
