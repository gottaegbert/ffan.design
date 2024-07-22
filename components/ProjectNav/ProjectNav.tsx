import React, { useState } from 'react';
import styles from './ProjectNav.module.scss';
import Image from 'next/image';

const ProjectNav = ({ projects, onSelect }) => {
  // State to track the selected project index
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  // Handler to update selected project and call onSelect
  const handleSelect = (index) => {
     console.log("Selecting index:", index); // Debugging: Check if this logs correctly
    setSelectedProjectIndex(index); // Update state
    onSelect(index); // Call onSelect prop function
  };

  return (
    <nav className={styles.projectNav}>
      <ul>
        {projects.map((project, index) => (
          <li key={project.slug} className={selectedProjectIndex === index ? styles.selected : ''}>
            <p onClick={() => handleSelect(index)}>
              {project.title}
            </p>
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
    </nav>
  );
};

export default ProjectNav;
