import React, { useEffect, useState, useRef } from 'react'
import styles from './ProjectNav.module.scss'
import Image from 'next/image'
import { gsap } from 'gsap/dist/gsap'
import cn from 'classnames'

const ProjectNav = ({ projects, onSelect }) => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)
    const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null) // New state for hover
    const [typeOneExpanded, setTypeOneExpanded] = useState(true)
    const [typeTwoExpanded, setTypeTwoExpanded] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [isSlidingOut, setIsSlidingOut] = useState(false)

    const imageRef = useRef<HTMLDivElement | null>(null) // Image container ref

    const typeOne = 'Industrial Design'
    const typeTwo = 'Graphic Design'

    
    const filteredProjectsByType = (type) => {
        return projects
            .filter((project) => project.types === type)
            .sort((a, b) => b.time - a.time); // 从新到旧排序
    }

    // 首先，创建一个函数来根据年份对项目进行分组
    const groupProjectsByYear = (projects) => {
    return projects.reduce((groups, project) => {
        const year = project.time; // 假设time属性是年份
        if (!groups[year]) {
            groups[year] = [];
        }
        groups[year].push(project);
        return groups;
    }, {});
};

    // 然后，在你的组件中使用这个函数
    const groupedProjects = groupProjectsByYear(
        filteredProjectsByType(typeOne)
    )
    // 在你的组件中使用这个函数
const groupedProjectsTypeTwo = groupProjectsByYear(filteredProjectsByType(typeTwo));


    const handleToggleSection = (type) => {
        setIsSlidingOut(true)
        setTimeout(() => {
            if (type === typeOne) {
                setTypeOneExpanded(true)
                setTypeTwoExpanded(false)

                // GSAP animation to expand typeOne and collapse typeTwo
                gsap.to('.sectionOne', {
                    width: '25vw',
                    height: '90vh',
                    duration: 0.5,
                })
                gsap.to('.sectionTwo', {
                    width: '100vw',
                    height: '10vh',
                    duration: 0.5,
                })

                const firstProjectIndex = projects.findIndex(
                    (project) => project.types === typeOne
                )
                setSelectedProjectIndex(firstProjectIndex)
                onSelect(firstProjectIndex)
                setImageLoaded(true)
            } else if (type === typeTwo) {
                setTypeOneExpanded(false)
                setTypeTwoExpanded(true)

                gsap.to('.sectionOne', {
                    width: '100vw',
                    height: '10vh',
                    duration: 0.5,
                })
                gsap.to('.sectionTwo', {
                    width: '25vw',
                    height: '90vh',
                    duration: 0.5,
                })

                const firstProjectIndex = projects.findIndex(
                    (project) => project.types === typeTwo
                )
                setSelectedProjectIndex(firstProjectIndex)
                onSelect(firstProjectIndex)
                setImageLoaded(true)
            }
            setIsSlidingOut(false)
        }, 200) // Duration of the slide-out animation
    }

    const handleSelect = (index, type) => {
        const filteredProjects = filteredProjectsByType(type)
        const projectIndex = projects.findIndex(
            (project) => project.slug === filteredProjects[index].slug
        )
        setSelectedProjectIndex(projectIndex)
        onSelect(projectIndex)
    }

    const handleMouseEnter = (index, type) => {
        const filteredProjects = filteredProjectsByType(type)
        const projectIndex = projects.findIndex(
            (project) => project.slug === filteredProjects[index].slug
        )
        setHoveredProjectIndex(projectIndex)
        setImageLoaded(true)
    }

    const handleMouseLeave = () => {
        setHoveredProjectIndex(null) // Reset hovered project index on leave
    }

    const displayedProjectIndex =
        hoveredProjectIndex !== null
            ? hoveredProjectIndex
            : selectedProjectIndex !== null
              ? selectedProjectIndex
              : typeOneExpanded
                ? projects.findIndex(
                      (project) =>
                          project.slug ===
                          filteredProjectsByType(typeOne)[0].slug
                  )
                : projects.findIndex(
                      (project) =>
                          project.slug ===
                          filteredProjectsByType(typeTwo)[0].slug
                  )

    useEffect(() => {
        // If no project is selected, default to the first project
        if (selectedProjectIndex === null && projects.length > 0) {
            setSelectedProjectIndex(0)
        }
    }, [projects, selectedProjectIndex])

    useEffect(() => {
        // If no project is selected, default to the first project of typeOne
        if (selectedProjectIndex === null && projects.length > 0) {
            const firstTypeOneProjectIndex = projects.findIndex(
                (project) => project.types === typeOne
            )
            setSelectedProjectIndex(firstTypeOneProjectIndex)
            onSelect(firstTypeOneProjectIndex)
        }
    }, [projects, selectedProjectIndex, onSelect])

    // Trigger GSAP animation on image change
    useEffect(() => {
        if (imageRef.current) {
            // Fade out the current image
            gsap.fromTo(
                imageRef.current,
                { opacity: 0.3 },
                { opacity: 1, duration: 0.4 }
            )
        }
    }, [displayedProjectIndex]) // When displayedProjectIndex changes, animate the new image

    return (
        <div className={styles.layoutContainer}>
            <nav className={styles.projectNav}>
                {/* Container that holds both sections */}
                <div className={styles.navContainer}>
                    {/* Section 1: Industrial Design */}
                    <div
                        className={cn(
                            'sectionOne',
                            `${styles.section} ${styles.sectionOne} ${typeOneExpanded ? styles.expanded : ''}`
                        )}
                        onClick={() => handleToggleSection(typeOne)}
                    >
                        <button
                            className={`${styles.sectionButton} ${typeOneExpanded ? styles.expanded : ''}`}
                        >
                            {typeOne}
                        </button>

                        {typeOneExpanded && (
    <div className={styles.projectListDark}>
        {Object.keys(groupedProjects).sort().reverse().map(year => (
            <div key={year}>
                <p className={styles.time}>{year}</p>
                <ul>
                    {groupedProjects[year].map((project, index) => (
                        <li
                            key={project.slug}
                            className={
                                selectedProjectIndex ===
                                projects.findIndex(
                                    (p) =>
                                        p.slug === project.slug
                                )
                                    ? styles.selectedsection1
                                    : ''
                            }
                            onClick={() =>
                                handleSelect(index, typeOne)
                            }
                            onMouseEnter={() =>
                                handleMouseEnter(index, typeOne)
                            }
                            onMouseLeave={handleMouseLeave} // Reset hover state on mouse leave
                        >
                            <p>[{project.tags}]</p>
                            <h6
                                className={styles.titleIndented}
                            >
                                {project.title}
                            </h6>
                        </li>
                    ))}
                </ul>
                <div style={{ marginTop: '20px' }}></div> 
            </div>
        ))}
    </div>
)}
                    </div>

                    {/* Section 2: Graphic Design */}
                    <div
                        className={cn(
                            'sectionTwo',
                            `${styles.section} ${styles.sectionTwo} ${typeTwoExpanded ? styles.expanded : ''}`
                        )}
                        onClick={() => handleToggleSection(typeTwo)}
                    >
                        <button
                            className={`${styles.sectionButton} ${styles.sectionButtonSectionTwo} ${typeTwoExpanded ? styles.expanded : ''}`}
                        >
                            {typeTwo}
                        </button>
                        {typeTwoExpanded && (
    <div className={styles.projectListLight}>
        {Object.keys(groupedProjectsTypeTwo).sort().reverse().map(year => (
            <div key={year}>
                <p className={styles.time}>{year}</p>
                <ul>
                    {groupedProjectsTypeTwo[year].map((project, index) => (
                        <li
                            key={project.slug}
                            className={
                                selectedProjectIndex ===
                                projects.findIndex(
                                    (p) =>
                                        p.slug === project.slug
                                )
                                    ? styles.selectedsection2
                                    : ''
                            }
                            onClick={() =>
                                handleSelect(index, typeTwo)
                            }
                            onMouseEnter={() =>
                                handleMouseEnter(index, typeTwo)
                            }
                            onMouseLeave={handleMouseLeave} // Reset hover state on mouse leave
                        >
                            <p>[{project.tags}]</p>
                            <h6
                                className={styles.titleIndented}
                            >
                                {project.title}
                            </h6>
                        </li>
                    ))}
                </ul>
                <div style={{ marginTop: '20px' }}></div> 
            </div>
        ))}
    </div>
)}
                    </div>
                </div>

                {/* Image display for hovered or selected project */}
                {projects[displayedProjectIndex] && (
                    <div
                        className={`${styles.imageContainer} ${typeOneExpanded ? styles.imageTop : styles.imageBottom}`}
                        ref={imageRef} // Reference to the image container
                    >
                        <Image
                            src={'/' + projects[displayedProjectIndex].image} // Show image based on hovered or selected index
                            alt={`Main image for ${projects[displayedProjectIndex].title}`}
                            className={`${styles.projectImage} ${typeOneExpanded ? styles.imageTop : styles.imageBottom}`}
                            height={
                                projects[displayedProjectIndex].height || '720'
                            }
                            width={
                                projects[displayedProjectIndex].width || '1280'
                            }
                        />
                    </div>
                )}
            </nav>
        </div>
    )
}

export default ProjectNav
