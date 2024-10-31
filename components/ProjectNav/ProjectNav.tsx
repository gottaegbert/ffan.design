import React, { useEffect, useState, useRef } from 'react'
import styles from './ProjectNav.module.scss'
import Image from 'next/image'
import { gsap } from 'gsap/dist/gsap'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'

const PlusIcon: React.FC<{ color: string; className?: string }> = ({
    color,
    className,
}) => (
    <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <line y1="18" x2="36" y2="18" stroke={color} strokeWidth="4" />
        <line x1="18" y1="36" x2="18" y2="0" stroke={color} strokeWidth="4" />
    </svg>
)

const ProjectNav = ({ projects, onSelect }) => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)
    const [hoveredProjectIndex, setHoveredProjectIndex] = useState(null) // New state for hover
    const [typeOneExpanded, setTypeOneExpanded] = useState(true)
    const [typeTwoExpanded, setTypeTwoExpanded] = useState(false)
    const [isTypeSwitching, setIsTypeSwitching] = useState(false)
    const imageRef = useRef<HTMLDivElement | null>(null) // Image container ref
    const [intervalId, setIntervalId] = useState(null)
    const [isUserInteracting, setIsUserInteracting] = useState(false)
    const sectionOneRef = useRef(null)
    const sectionTwoRef = useRef(null)
    const router = useRouter()

    const typeOne = 'Industrial Design'
    const typeTwo = 'Graphic Design'

    // 在组件顶部添加这个函数
    const debouncedHandleMouseEnter = debounce((slug) => {
        if (isTypeSwitching) return
        setIsUserInteracting(true)
        clearInterval(intervalId)
        const projectIndex = projects.findIndex(
            (project) => project.slug === slug
        )
        setHoveredProjectIndex(projectIndex)
        setSelectedProjectIndex(projectIndex)
        onSelect(projectIndex)
    }, 100) // 100ms 的延迟

    //轮播
    const goToNextProject = () => {
        if (isUserInteracting) return // 如果用户正在交，不进行自动轮播
        const nextIndex =
            selectedProjectIndex < projects.length - 1
                ? selectedProjectIndex + 1
                : 0
        const nextProjectType = projects[nextIndex].types

        // Check if the next project is of the same type as the current one
        if (projects[selectedProjectIndex].types === nextProjectType) {
            setSelectedProjectIndex(nextIndex)
        } else {
            // If the next project is of a different type, go to the first project of the current type
            const firstProjectIndex = projects.findIndex(
                (project) =>
                    project.types === projects[selectedProjectIndex].types
            )
            setSelectedProjectIndex(firstProjectIndex)
        }

        // Check the type of the next project and switch the expanded section if necessary
        if (nextProjectType === typeOne) {
            handleToggleSection(typeOne)
        } else if (nextProjectType === typeTwo) {
            handleToggleSection(typeTwo)
        }
    }

    useEffect(() => {
        const id = setInterval(goToNextProject, 3000) // 将间隔改为 5 秒
        setIntervalId(id)
        return () => clearInterval(id)
    }, [selectedProjectIndex, isUserInteracting])

    // Clear the interval when the component unmounts
    useEffect(() => {
        return () => {
            clearInterval(intervalId)
        }
    }, [intervalId])

    //分类
    const filteredProjectsByType = (type) => {
        return projects
            .filter((project) => project.types === type)
            .sort((a, b) => b.time - a.time) // 从新到旧排序
    }

    // 首先，创建一个函数来根据年份对项目进行分组
    const groupProjectsByYear = (projects) => {
        return projects.reduce((groups, project) => {
            const year = project.time // 假设time属性是年份
            if (!groups[year]) {
                groups[year] = []
            }
            groups[year].push(project)
            return groups
        }, {})
    }

    // 然后，在你的组件中使用这个函数
    const groupedProjects = groupProjectsByYear(filteredProjectsByType(typeOne))
    // 在你的组件中使用这个函数
    const groupedProjectsTypeTwo = groupProjectsByYear(
        filteredProjectsByType(typeTwo)
    )

    const handleToggleSection = (type) => {
        setIsUserInteracting(true)
        setIsTypeSwitching(true)

        // 添加延迟
        setTimeout(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsUserInteracting(false)
                    setIsTypeSwitching(false)
                },
            })

            if (type === typeOne) {
                setTypeOneExpanded(true)
                setTypeTwoExpanded(false)

                tl.to(sectionOneRef.current, {
                    width: '25vw',
                    height: '90vh',
                    duration: 0.5,
                }).to(
                    sectionTwoRef.current,
                    {
                        width: '100vw',
                        height: '10vh',
                        duration: 0.5,
                    },
                    '-=0.5'
                )

                if (projects[selectedProjectIndex]?.types !== typeOne) {
                    const firstProjectIndex = projects.findIndex(
                        (project) => project.types === typeOne
                    )
                    setSelectedProjectIndex(firstProjectIndex)
                    onSelect(firstProjectIndex)
                }
            } else if (type === typeTwo) {
                setTypeOneExpanded(false)
                setTypeTwoExpanded(true)

                tl.to(sectionOneRef.current, {
                    width: '100vw',
                    height: '10vh',
                    duration: 0.5,
                }).to(
                    sectionTwoRef.current,
                    {
                        width: '25vw',
                        height: '90vh',
                        duration: 0.5,
                    },
                    '-=0.5'
                )

                if (projects[selectedProjectIndex]?.types !== typeTwo) {
                    const firstProjectIndex = projects.findIndex(
                        (project) => project.types === typeTwo
                    )
                    setSelectedProjectIndex(firstProjectIndex)
                    onSelect(firstProjectIndex)
                }
            }
        }, 300) // 300毫秒���延迟，你可以根据需要调整这个值
    }

    const handleSelect = (slug) => {
        router.push(`/${slug}`)
    }

    const handleMouseEnter = (slug, type) => {
        debouncedHandleMouseEnter(slug, type)
    }

    const handleMouseLeave = () => {
        debouncedHandleMouseEnter.cancel() // 取消未执行的防抖函数
        setIsUserInteracting(false)
        setHoveredProjectIndex(null)
        const id = setInterval(goToNextProject, 5000)
        setIntervalId(id)
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

    const handleCheckAllClick = (filter: string) => {
        router.push(`/#work-section?filter=${filter}`, undefined, {
            shallow: true,
        })
    }

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
                            <div className={styles.sectionButtonContent}>
                                {typeOne}
                                {!typeOneExpanded && (
                                    <PlusIcon
                                        color="#D9D9D9"
                                        className={styles.plusIcon}
                                    />
                                )}
                            </div>
                        </button>

                        {typeOneExpanded && (
                            <div className={styles.projectListDark}>
                                <div>
                                    {Object.keys(groupedProjects)
                                        .sort()
                                        .reverse()
                                        .map((year: string) => (
                                            <div key={year}>
                                                <h6 className={styles.time}>
                                                    {year}
                                                </h6>
                                                <ul>
                                                    {groupedProjects[year].map(
                                                        (
                                                            project: any,
                                                            index: number
                                                        ) => (
                                                            <li
                                                                key={
                                                                    project.slug
                                                                }
                                                                className={
                                                                    selectedProjectIndex ===
                                                                    projects.findIndex(
                                                                        (p) =>
                                                                            p.slug ===
                                                                            project.slug
                                                                    )
                                                                        ? styles.selectedsection1
                                                                        : ''
                                                                }
                                                                onClick={() =>
                                                                    handleSelect(
                                                                        project.slug
                                                                    )
                                                                }
                                                                onMouseEnter={() =>
                                                                    handleMouseEnter(
                                                                        project.slug,
                                                                        typeOne
                                                                    )
                                                                }
                                                                onMouseLeave={
                                                                    handleMouseLeave
                                                                } // Reset hover state on mouse leave
                                                            >
                                                                <h6>
                                                                    [
                                                                    {
                                                                        project.tags
                                                                    }
                                                                    ]
                                                                </h6>
                                                                <h6
                                                                    className={
                                                                        styles.titleIndented
                                                                    }
                                                                >
                                                                    {
                                                                        project.title
                                                                    }
                                                                </h6>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                                <div
                                                    style={{ marginTop: '2vh' }}
                                                ></div>
                                            </div>
                                        ))}
                                </div>
                                <div
                                    className={cn(
                                        `${styles.checkAllLink} ${styles.whiteText}`
                                    )}
                                    onClick={() =>
                                        handleCheckAllClick('industrial-design')
                                    }
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
                            <div className={styles.sectionButtonContent}>
                                {typeTwo}
                                {!typeTwoExpanded && (
                                    <PlusIcon
                                        color="#797979"
                                        className={styles.plusIconExpanded}
                                    />
                                )}
                            </div>
                        </button>
                        {typeTwoExpanded && (
                            <div className={styles.projectListLight}>
                                <div>
                                    {Object.keys(groupedProjectsTypeTwo)
                                        .sort()
                                        .reverse()
                                        .map((year) => (
                                            <div key={year}>
                                                <h6 className={styles.time}>
                                                    {year}
                                                </h6>
                                                <ul>
                                                    {groupedProjectsTypeTwo[
                                                        year
                                                    ].map((project) => (
                                                        <li
                                                            key={project.slug}
                                                            className={
                                                                selectedProjectIndex ===
                                                                projects.findIndex(
                                                                    (p) =>
                                                                        p.slug ===
                                                                        project.slug
                                                                )
                                                                    ? styles.selectedsection2
                                                                    : ''
                                                            }
                                                            onClick={() =>
                                                                handleSelect(
                                                                    project.slug
                                                                )
                                                            }
                                                            onMouseEnter={() =>
                                                                handleMouseEnter(
                                                                    project.slug,
                                                                    typeTwo
                                                                )
                                                            }
                                                            onMouseLeave={
                                                                handleMouseLeave
                                                            } // Reset hover state on mouse leave
                                                        >
                                                            <h6>
                                                                [{project.tags}]
                                                            </h6>
                                                            <h6
                                                                className={
                                                                    styles.titleIndented
                                                                }
                                                            >
                                                                {project.title}
                                                            </h6>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div
                                                    style={{ marginTop: '2vh' }}
                                                ></div>
                                            </div>
                                        ))}
                                </div>
                                <div
                                    className={cn(
                                        `${styles.checkAllLink} ${styles.blackText}`
                                    )}
                                    onClick={() =>
                                        handleCheckAllClick('graphic-design')
                                    }
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
                        className={`${styles.imageContainer} ${
                            typeOneExpanded
                                ? styles.imageTopDark
                                : styles.imageBottom
                        }`}
                        ref={imageRef}
                    >
                        {projects[displayedProjectIndex].image.endsWith(
                            '.mp4'
                        ) ? (
                            <video
                                key={projects[displayedProjectIndex].slug}
                                src={
                                    '/' + projects[displayedProjectIndex].image
                                }
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                className={`${styles.projectImage} ${
                                    typeOneExpanded
                                        ? styles.imageTopDark
                                        : styles.imageBottom
                                }`}
                            />
                        ) : (
                            <Image
                                key={projects[displayedProjectIndex].slug}
                                priority
                                src={
                                    '/' + projects[displayedProjectIndex].image
                                }
                                alt={`Main image for ${projects[displayedProjectIndex].title}`}
                                className={`${styles.projectImage} ${
                                    typeOneExpanded
                                        ? styles.imageTopDark
                                        : styles.imageBottom
                                }`}
                                height={
                                    projects[displayedProjectIndex].height ||
                                    '720'
                                }
                                width={
                                    projects[displayedProjectIndex].width ||
                                    '1280'
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
