import React, { useState } from 'react';
import styles from './ProjectNav.module.scss';
import Image from 'next/image';

const ProjectNav = ({ projects, onSelect }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null); // New state for hover
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

  const handleMouseEnter = (index) => {
    setHoveredProjectIndex(index); // Set hovered project index
  };

  const handleMouseLeave = () => {
    setHoveredProjectIndex(null); // Reset hovered project index on leave
  };

  // Determine which project image to display (hovered or selected)
  const displayedProjectIndex = hoveredProjectIndex !== null ? hoveredProjectIndex : selectedProjectIndex;

  return (
    <nav className={styles.projectNav}>
      {/* Container that holds both sections */}
      <div className={styles.navContainer}>
        {/* Section 1: Industrial Design */}
        <div
          className={`${styles.section} ${styles.sectionOne} ${typeOneExpanded ? styles.expanded : ''}`}
          onClick={() => handleToggleSection(typeOne)}
        >
          <button className={`${styles.sectionButton} ${typeOneExpanded ? styles.expanded : ''}`}>
            {typeOne}
          </button>
        </div>

        {typeOneExpanded && (
          <ul className={styles.projectListDark}>
            {filteredProjectsByType(typeOne).map((project, index) => (
              <li
                key={project.slug}
                className={selectedProjectIndex === index ? styles.selectedsection1 : ''}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => handleMouseEnter(index)} // Set hover state on mouse enter
                onMouseLeave={handleMouseLeave} // Reset hover state on mouse leave
              >
                <p>[{project.types}]</p>
                <h6 className={styles.titleIndented}>{project.title}</h6>
              </li>
            ))}
          </ul>
        )}

        {/* Section 2: Graphic Design */}
        <div
          className={`${styles.section} ${styles.sectionTwo} ${typeTwoExpanded ? styles.expanded : ''}`}
          onClick={() => handleToggleSection(typeTwo)}
        >
          <button className={`${styles.sectionButton} ${styles.sectionButtonSectionTwo} ${typeTwoExpanded ? styles.expanded : ''}`}>
            {typeTwo}
          </button>
        </div>

        {typeTwoExpanded && (
          <ul className={styles.projectListLight}>
            {filteredProjectsByType(typeTwo).map((project, index) => (
              <li
                key={project.slug}
                className={selectedProjectIndex === index ? styles.selectedsection2 : ''}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => handleMouseEnter(index)} // Set hover state on mouse enter
                onMouseLeave={handleMouseLeave} // Reset hover state on mouse leave
              >
                <p>[{project.types}]</p>
                <h6 className={styles.titleIndented}>{project.title}</h6>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Image display for hovered or selected project */}
      {displayedProjectIndex !== null && (
     
            <div className={`${styles.imageContainer} ${typeOneExpanded ? styles.imageTop : styles.imageBottom}`}>
            <Image
              src={"/" + projects[displayedProjectIndex].image} // Show image based on hovered or selected index
              alt={`Main image for ${projects[displayedProjectIndex].title}`}
              className={`${styles.projectImage} ${typeOneExpanded ? styles.imageTop : styles.imageBottom}`}
              height={projects[displayedProjectIndex].height || '720'}
              width={projects[displayedProjectIndex].width || '1280'}
              
            />
          </div>
      
      )}
    </nav>
  );
};

export default ProjectNav;
