import { useEffect, useState } from 'react';
import { opacity, slideUp } from './animation';
import styles from './Preloader.module.scss';
import { motion } from 'framer-motion';

const preloaderWords: string[] = [
  'Loading🎬',
  'ffandesign'

];
const Preloader = ({progress}) => {
  const [index, setIndex] = useState(0); // Index for the array of words
  const [dimension, setDimension] = useState({ width: 0, height: 0 }); // Window dimensions

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === preloaderWords.length - 1) return;
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index === 0 ? 1000 : 150
    );
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
    dimension.width / 2
  } ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
    dimension.width / 2
  } ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  return (
    <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
      {dimension.width > 0 && (
        <>
          <div className={styles.preloader}>
          <p>Loading... {progress.toFixed(0)}%</p>
          <div className={styles.loadingBar} style={{ width: `${progress}%` }}></div>
          </div>
       
          <svg>

            <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default Preloader;
