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
      setTypeTwoExpanded(true);
      setTypeOneExpanded(false);
    }
  };

  const handleSelect = (index) => {
    setSelectedProjectIndex(index);
    onSelect(index);
  };

  return (
    <nav className={styles.projectNav}>
      <div>
        {/* Type 1 (Industrial Design) Section */}
        <div 
          className={styles.typeOneSection} 
          onClick={() => handleToggleSection(typeOne)}
        >
          {typeOne}
        </div>
        { typeOneExpanded && (
          <ul className={styles.typeOneProjectList}>
            {filteredProjectsByType(typeOne).map((project, index) => (
              <li 
                key={project.slug} 
                className={selectedProjectIndex === index ? styles.selected : ''} 
                onClick={() => handleSelect(index)}
              >
                <p>{project.types}</p>
                <h6>{project.title}</h6>
                <Image
                  src={"/" + project.image}
                  alt={`main image for ${project.title}`}
                  className={styles.projectImage}
                  height={project.height || '900'}
                  width={project.width || '1600'}
                />
              </li>
            ))}
          </ul>
        )}

        {/* Type 2 (Graphic Design) Section */}
        <div 
          className={styles.typeTwoSection} 
          onClick={() => handleToggleSection(typeTwo)}
        >
          {typeTwo}
        </div>
        { typeTwoExpanded && (
          <ul className={styles.typeTwoProjectList}>
            {filteredProjectsByType(typeTwo).map((project, index) => (
              <li 
                key={project.slug} 
                className={selectedProjectIndex === index ? styles.selected : ''} 
                onClick={() => handleSelect(index)}
              >
                <p>{project.types}</p>
                <h6>{project.title}</h6>
                <Image
                  src={"/" + project.image}
                  alt={`main image for ${project.title}`}
                  className={styles.projectImage}
                  height={project.height || '900'}
                  width={project.width || '1600'}
                />
              </li>
            ))}
          </ul>
        )}

        {/* Display selected project image */}
        {selectedProjectIndex !== null && (
          <div className={styles.selected}>
            <Image
              src={"/" + projects[selectedProjectIndex].image}
              alt={`main image for ${projects[selectedProjectIndex].title}`}
              className={styles.projectImage}
              height={projects[selectedProjectIndex].height || '900'}
              width={projects[selectedProjectIndex].width || '1600'}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default ProjectNav;
