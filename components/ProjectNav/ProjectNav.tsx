import React, { useEffect, useState } from "react";
import styles from "./ProjectNav.module.scss";
import Image from "next/image";

const ProjectNav = ({ projects, onSelect }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null); // New state for hover
  const [typeOneExpanded, setTypeOneExpanded] = useState(true);
  const [typeTwoExpanded, setTypeTwoExpanded] = useState(false);

  const typeOne = "Industrial Design";
  const typeTwo = "Graphic Design";
  //导航栏
  const [isRightNavVisible, setIsRightNavVisible] = useState(false); // 控制右侧导航栏是否可见
  const toggleRightNav = () => {
    setIsRightNavVisible(!isRightNavVisible);
  };

  const filteredProjectsByType = (type) => {
    return projects.filter((project) => project.types === type);
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
  const displayedProjectIndex =
    hoveredProjectIndex !== null ? hoveredProjectIndex : selectedProjectIndex;

  useEffect(() => {
    // If no project is selected, default to the first project
    if (selectedProjectIndex === null && projects.length > 0) {
      setSelectedProjectIndex(0);
    }
  }, [projects, selectedProjectIndex]);

  return (
    <div className={styles.layoutContainer}>
      <nav className={styles.projectNav}>
        {/* Container that holds both sections */}
        <div className={styles.navContainer}>
          {/* Section 1: Industrial Design */}
          <div
            className={`${styles.section} ${styles.sectionOne} ${typeOneExpanded ? styles.expanded : ""}`}
            onClick={() => handleToggleSection(typeOne)}
          >
            <button
              className={`${styles.sectionButton} ${typeOneExpanded ? styles.expanded : ""}`}
            >
              {typeOne}
            </button>
          </div>

          {typeOneExpanded && (
            <ul className={styles.projectListDark}>
              {filteredProjectsByType(typeOne).map((project, index) => (
                <li
                  key={project.slug}
                  className={
                    selectedProjectIndex === index
                      ? styles.selectedsection1
                      : ""
                  }
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
            className={`${styles.section} ${styles.sectionTwo} ${typeTwoExpanded ? styles.expanded : ""}`}
            onClick={() => handleToggleSection(typeTwo)}
          >
            <button
              className={`${styles.sectionButton} ${styles.sectionButtonSectionTwo} ${typeTwoExpanded ? styles.expanded : ""}`}
            >
              {typeTwo}
            </button>
          </div>

          {typeTwoExpanded && (
            <ul className={styles.projectListLight}>
              {filteredProjectsByType(typeTwo).map((project, index) => (
                <li
                  key={project.slug}
                  className={
                    selectedProjectIndex === index
                      ? styles.selectedsection2
                      : ""
                  }
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

        {projects[displayedProjectIndex] && (
          <div
            className={`${styles.imageContainer} ${typeOneExpanded ? styles.imageTop : styles.imageBottom}`}
          >
            <Image
              src={"/" + projects[displayedProjectIndex].image} // Show image based on hovered or selected index
              alt={`Main image for ${projects[displayedProjectIndex].title}`}
              className={`${styles.projectImage} ${typeOneExpanded ? styles.imageTop : styles.imageBottom}`}
              height={projects[displayedProjectIndex].height || "720"}
              width={projects[displayedProjectIndex].width || "1280"}
            />
          </div>
        )}
      </nav>

      {/* 汉堡菜单按钮 */}
      <button
        className={`${styles.hamburgerMenu} ${typeTwoExpanded ? styles.graphicDesignExpanded : ""}`}
        onClick={toggleRightNav}
      >
        &#9776; {/* Unicode for hamburger icon */}
      </button>

      {/* 右侧导航栏 */}
      <aside
        className={`${styles.rightNav} ${isRightNavVisible ? styles.visible : ""}`}
      >
        <ul>
          <li>Home</li>
          <li>Works</li>
          <li>Awards</li>
          <li>Team</li>
          <li>Contact</li>
        </ul>
        <div className={styles.contactInfo}>
          <p>Based in Brooklyn & Beijing</p>
          <p>Instagram: ffan.design</p>
          <p>Email: info@ffandesign.com</p>
        </div>
      </aside>
    </div>
  );
};

export default ProjectNav;
