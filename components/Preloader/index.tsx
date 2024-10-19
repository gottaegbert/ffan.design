import { useEffect, useState, useRef } from 'react';
import styles from './Preloader.module.scss';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnd);
    }
    return () => {
      if (video) {
        video.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, []);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setTimeout(() => {
      onComplete();
    }, 500); // 延迟调用 onComplete，给动画一些时间
  };

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
    dimension.width / 2
  } ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
    dimension.width / 2
  } ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  const containerVariants = {
    initial: { y: 0 },
    exit: { y: '-100%', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <AnimatePresence>
      {!isVideoEnded && (
        <motion.div 
          variants={containerVariants}
          initial="initial"
          animate="initial"
          exit="exit"
          className={styles.introduction}
        >
          <video 
            ref={videoRef}
            className={styles.backgroundVideo}
            src="./assets/images/loading.mp4"
            muted
            playsInline
          />
          {dimension.width > 0 && (
            <svg className={styles.svgCurve}>
              <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
