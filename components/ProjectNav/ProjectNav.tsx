import React, { useState } from 'react';
import styles from './ProjectNav.module.scss';
import Image from 'next/image';
const ProjectNav = ({ projects, onSelect }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [typeOneExpanded, setTypeOneExpanded] = useState(true);
  const [typeTwoExpanded, setTypeTwoExpanded] = useState(false);

  const typeOne = 'Industrial Design';
  const typeTwo = 'Graphic Design';

  const filteredProjectsByType = (type) => {
    return projects.filter(project => project.types === type);
  };

  const handleToggleSection = (type) => {
    if (type === typeOne) {
      setTypeOneExpanded(true);
      setTypeTwoExpanded(false);
    } else if (type === typeTwo) {
      setTypeOneExpanded(false);
      setTypeTwoExpanded(true);
    }
  };

  const handleSelect = (index) => {
    setSelectedProjectIndex(index);
    onSelect(index);
  };

  return (
    <nav className={styles.projectNav}>
      {/* Container that holds both sections */}
      <div className={styles.navContainer}>
        {/* Section 1: Industrial Design */}
        <div 
          className={`${styles.section} ${styles.sectionOne}`} 
          onClick={() => handleToggleSection(typeOne)}
        >
          <button className={styles.sectionButton}>{typeOne}</button>
        </div>

        {typeOneExpanded && (
          <ul className={styles.projectListDark}>
            {filteredProjectsByType(typeOne).map((project, index) => (
              <li 
                key={project.slug}
                className={selectedProjectIndex === index ? styles.selected : ''}
                onClick={() => handleSelect(index)}
              >
                <p>{project.types}</p>
                <h6>{project.title}</h6>
                 
              </li>
            ))}
          </ul>
        )}
  
        {/* Section 2: Graphic Design */}
        <div 
          className={`${styles.section} ${styles.sectionTwo}`} 
          onClick={() => handleToggleSection(typeTwo)}
        >
          <button className={styles.sectionButton}>{typeTwo}</button>
        </div>

        {typeTwoExpanded && (
          <ul className={styles.projectListLight}>
            {filteredProjectsByType(typeTwo).map((project, index) => (
              <li 
                key={project.slug}
                className={selectedProjectIndex === index ? styles.selected : ''}
                onClick={() => handleSelect(index)}
              >
                <p>{project.types}</p>
                <h6>{project.title}</h6>
                
              </li>
            ))}
          </ul>
          
        )}
        

       
      </div>
    </nav>
    
  );
};

export default ProjectNav;
