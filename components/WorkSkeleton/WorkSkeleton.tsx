import React from 'react';
import styles from './WorkSkeleton.module.scss';

const WorkSkeleton: React.FC = () => {
  return (
    <div className={styles.workSkeleton}>
      <div className={styles.imageSkeleton}></div>
      <div className={styles.contentSkeleton}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.descriptionSkeleton}></div>
        <div className={styles.descriptionSkeleton}></div>
      </div>
    </div>
  );
};

export default WorkSkeleton;
