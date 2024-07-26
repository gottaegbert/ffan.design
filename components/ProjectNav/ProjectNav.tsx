import React, { useState } from 'react';
import styles from './ProjectNav.module.scss';
import Image from 'next/image';

const ProjectNav = ({ projects, onSelect }) => {
  // State to track the selected project index
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  // 新状态，用于控制不同类型项目的展开/折叠
  const [typeOneExpanded, setTypeOneExpanded] = useState(true);
  const [typeTwoExpanded, setTypeTwoExpanded] = useState(false);

  // 假设项目类型为 "type1" 和 "type2"
  const typeOne = 'Industrial Design';
  const typeTwo = 'Graphic Design';
  
  // 过滤项目
  const filteredProjectsByType = (type) => {
    return projects.filter(project => project.types === type);
  };
  console.log(filteredProjectsByType(typeTwo));

  // 展开/折叠处理函数
  const handleToggleSection = (type) => {
    if (type === typeOne) {
      setTypeOneExpanded(!typeOneExpanded);
    } else if (type === typeTwo) {
      setTypeTwoExpanded(!typeTwoExpanded);
    }
  };


  // Handler to update selected project and call onSelect
  const handleSelect = (index) => {
    //  console.log("Selecting index:", index); // Debugging: Check if this logs correctly
    setSelectedProjectIndex(index); // Update state
    onSelect(index); // Call onSelect prop function
  };


return (
    <nav className={styles.projectNav}>
      <div>

        {/* 类型1项目的section */}
      <h5 onClick={() => handleToggleSection(typeOne)}>{typeOne}</h5>
        { typeOneExpanded && (
            <ul className={typeOneExpanded ? '' : styles.hidden}>
            {filteredProjectsByType(typeOne).map((project, index) => (
              <li key={project.slug} className={selectedProjectIndex === index ? styles.selected : ''} onClick={() => handleSelect(index)}>
              
            <p>
              {project.types}
            </p>
            <h6 onClick={() => handleSelect(index)}>
              {project.title}
            </h6>
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

        {/* 类型2项目的section */}
        <h5 onClick={() => handleToggleSection(typeTwo)}>{typeTwo}</h5>
        { typeTwoExpanded && (
                  <ul className={typeTwoExpanded ? '' : styles.hidden}>
            {filteredProjectsByType(typeTwo).map((project, index) => (
              <li key={project.slug} className={selectedProjectIndex === index ? styles.selected : ''} onClick={() => handleSelect(index)}>
               
            <p>
              {project.types}
            </p>
            <h6 onClick={() => handleSelect(index)}>
              {project.title}
            </h6>
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

        {/* 选中项目的图像 */}
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