import React, { useEffect, useState, useRef } from 'react'
import styles from './ProjectNav.module.scss'
import Image from 'next/image'
import { gsap } from 'gsap/dist/gsap'
import cn from 'classnames'
import PlusIcon from '../../public/assets/images/+.svg';
import { useRouter } from 'next/router';

const ProjectNav = ({ projects, onSelect }) => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)
    const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null) // New state for hover
    const [typeOneExpanded, setTypeOneExpanded] = useState(true)
    const [typeTwoExpanded, setTypeTwoExpanded] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [isSlidingOut, setIsSlidingOut] = useState(false)
    const [isTypeSwitching, setIsTypeSwitching] = useState(false);
    const imageRef = useRef<HTMLDivElement | null>(null) // Image container ref
    const [intervalId, setIntervalId] = useState(null);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const sectionOneRef = useRef(null);
    const sectionTwoRef = useRef(null);
    const router = useRouter();

    const typeOne = 'Industrial Design'
    const typeTwo = 'Graphic Design'

    //轮播
    const goToNextProject = () => {
        if (isUserInteracting) return; // 如果用户正在交，不进行自动轮播
        const nextIndex = selectedProjectIndex < projects.length - 1 ? selectedProjectIndex + 1 : 0;
        const nextProjectType = projects[nextIndex].types;

        // Check if the next project is of the same type as the current one
        if (projects[selectedProjectIndex].types === nextProjectType) {
            setSelectedProjectIndex(nextIndex);
        } else {
            // If the next project is of a different type, go to the first project of the current type
            const firstProjectIndex = projects.findIndex(
                (project) => project.types === projects[selectedProjectIndex].types
            );
            setSelectedProjectIndex(firstProjectIndex);
        }

        // Check the type of the next project and switch the expanded section if necessary
        if (nextProjectType === typeOne ) {
            handleToggleSection(typeOne);
        } else if (nextProjectType === typeTwo) {
            handleToggleSection(typeTwo);
        }
    };

    useEffect(() => {
        const id = setInterval(goToNextProject, 5000); // 将间隔改为 5 秒
        setIntervalId(id);
        return () => clearInterval(id);
    }, [selectedProjectIndex, isUserInteracting]);

    // Clear the interval when the component unmounts
    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);
    
    //分类
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
        setIsUserInteracting(true);
        setIsSlidingOut(true);
        setIsTypeSwitching(true);

        // 添加延迟
        setTimeout(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsSlidingOut(false);
                    setIsUserInteracting(false);
                    setIsTypeSwitching(false);
                }
            });

            if (type === typeOne) {
                setTypeOneExpanded(true);
                setTypeTwoExpanded(false);

                tl.to(sectionOneRef.current, {
                    width: '25vw',
                    height: '90vh',
                    duration: 0.5,
                }).to(sectionTwoRef.current, {
                    width: '100vw',
                    height: '10vh',
                    duration: 0.5,
                }, "-=0.5");

                if (projects[selectedProjectIndex]?.types !== typeOne) {
                    const firstProjectIndex = projects.findIndex(
                        (project) => project.types === typeOne
                    );
                    setSelectedProjectIndex(firstProjectIndex);
                    onSelect(firstProjectIndex);
                }
            } else if (type === typeTwo) {
                setTypeOneExpanded(false);
                setTypeTwoExpanded(true);

                tl.to(sectionOneRef.current, {
                    width: '100vw',
                    height: '10vh',
                    duration: 0.5,
                }).to(sectionTwoRef.current, {
                    width: '25vw',
                    height: '90vh',
                    duration: 0.5,
                }, "-=0.5");

                if (projects[selectedProjectIndex]?.types !== typeTwo) {
                    const firstProjectIndex = projects.findIndex(
                        (project) => project.types === typeTwo
                    );
                    setSelectedProjectIndex(firstProjectIndex);
                    onSelect(firstProjectIndex);
                }
            }

            setImageLoaded(true);
        }, 300); // 300毫秒的延迟，你可以根据需要调整这个值
    };
// 修改handleSelect和handleMouseEnter函数，使它们接收一个slug参数，然后使用这个slug来查找项目的索引
const handleSelect = (slug) => {
    router.push(`/${slug}`);
};

const handleMouseEnter = (slug, type) => {
    if (isTypeSwitching) return; // 如果正在切换类型，不触发 hover 效果
    setIsUserInteracting(true);
    clearInterval(intervalId);
    const projectIndex = projects.findIndex(
        (project) => project.slug === slug
    );
   
    setSelectedProjectIndex(projectIndex);
    onSelect(projectIndex);
    setImageLoaded(true);
};

    const handleMouseLeave = () => {
        setIsUserInteracting(false); // 添加这行
        const id = setInterval(goToNextProject, 5000);
        setIntervalId(id);
    }

    const displayedProjectIndex =
        !isTypeSwitching && hoveredProjectIndex !== null
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

    const handleCheckAllClick = (filter: string) => {
        router.push(`/#work-section?filter=${filter}`, undefined, { shallow: true });
    };

    return (
        <div className={styles.layoutContainer}>
            <nav className={styles.projectNav}>
                {/* Container that holds both sections */}
                <div className={styles.navContainer}>
                    {/* Section 1: Industrial Design */}
                    <div
                        ref={sectionOneRef}
                        className={cn(
                            'sectionOne',
                            `${styles.section} ${styles.sectionOne} ${typeOneExpanded ? styles.expanded : ''}`
                        )}
                        >
                        <button
                            className={`${styles.sectionButton} ${typeOneExpanded ? styles.expanded : ''}`}
                            onMouseEnter={() => handleToggleSection(typeOne)}
                            >
                            <div className={styles.sectionButtonContent}
                        >
                          
                            {typeOne}
                            {!typeOneExpanded && (
      <Image src={PlusIcon} alt="Expand" className={styles.plusIcon} />
    )}
                            </div>
                        </button>

                        {typeOneExpanded && (
    <div className={styles.projectListDark}>
        <div>
        {Object.keys(groupedProjects).sort().reverse().map((year: string) => (
            <div key={year}>
                <h6 className={styles.time}>{year}</h6>
                <ul>
                    {groupedProjects[year].map((project: any, index: number) => (
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
                                handleSelect(project.slug)
                            }
                            onMouseEnter={() =>
                                handleMouseEnter(project.slug, typeOne)
                            }
                            onMouseLeave={handleMouseLeave} // Reset hover state on mouse leave
                        >
                            <h6>[{project.tags}]</h6>
                            <h6
                                className={styles.titleIndented}
                            >
                                {project.title}
                            </h6>
                        </li>
                    ))}
                </ul>
                <div style={{ marginTop: '1vh' }}></div> 
                    
            </div>
        ))}

        </div>
        <div 
           className={cn(`${styles.checkAllLink} ${styles.whiteText}`)}
          onClick={() => handleCheckAllClick('industrial-design')}
        >
          <h6>Check All Industrial Design Works</h6>
        </div>
       
    
    </div>
)}
                    </div>

                    {/* Section 2: Graphic Design */}
                    <div
                        ref={sectionTwoRef}
                        className={cn(
                            'sectionTwo',
                            `${styles.section} ${styles.sectionTwo} ${typeTwoExpanded ? styles.expanded : ''}`
                        )}
                       
                    >
                        <button
                            className={`${styles.sectionButton} ${styles.sectionButtonSectionTwo} ${typeTwoExpanded ? styles.expanded : ''}`}
                            onMouseEnter={() => handleToggleSection(typeTwo)}
                        >
                          <div className={styles.sectionButtonContent}
                          >
                            {typeTwo}
                            {!typeTwoExpanded && (
      <Image src={PlusIcon} alt="Expand" className={styles.plusIcon} />
    )}
                            </div>
                        </button>
                        {typeTwoExpanded && (
    <div className={styles.projectListLight}>
        <div>
        {Object.keys(groupedProjectsTypeTwo).sort().reverse().map(year => (
            <div key={year}>
                <h6 className={styles.time}>{year}</h6>
                <ul>
                    {groupedProjectsTypeTwo[year].map((project) => (
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
                                handleSelect(project.slug)
                            }
                            onMouseEnter={() =>
                                handleMouseEnter(project.slug, typeTwo)
                            }
                            onMouseLeave={handleMouseLeave} // Reset hover state on mouse leave
                        >
                            <h6>[{project.tags}]</h6>
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
         <div 
        className={cn(`${styles.checkAllLink} ${styles.blackText}`)}
          onClick={() => handleCheckAllClick('graphic-design')}
        >
          <h6>Check All Graphic Design Works</h6>
        </div>
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
                          {projects[displayedProjectIndex].image.endsWith('.mp4') ? (
                            <video
                                src={'/' + projects[displayedProjectIndex].image} // Show video based on hovered or selected index
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}    
                                className={`${styles.projectImage} ${typeOneExpanded ? styles.imageTop : styles.imageBottom}`}
                            />
                        ) : (
                            <Image
                                src={'/' + projects[displayedProjectIndex].image} // Show image based on hovered or selected index
                                alt={`Main image for ${projects[displayedProjectIndex].title}`}
                                className={`${styles.projectImage} ${typeOneExpanded ? styles.imageTop : styles.imageBottom}`}
                                  loading="lazy"
                                height={
                                    projects[displayedProjectIndex].height || '720'
                                }
                                width={
                                    projects[displayedProjectIndex].width || '1280'
                                }
                            />
                        )}
                    </div>
                )}
            </nav>
        </div>
    )
}

export default ProjectNav
