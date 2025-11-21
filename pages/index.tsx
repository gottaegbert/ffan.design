/* eslint-disable react/no-children-prop */
import * as React from 'react'
import styles from './index.module.scss'
import Layout from '../components/Layout/Layout'
import cn from 'classnames'
import { useState, useEffect, useRef } from 'react'
import StaggeredTitle from '../components/StaggeredTitle/StaggeredTitle'
import CaseStudy from '../components/CaseStudy/CaseStudy'
import { GetStaticProps } from 'next'
import { gePageData } from '../utils/pages'
import { StoreProvider } from '../utils/StoreProvider'
import BasicMeta from '../utils/BasicMeta'
import { homePageData } from '../utils/customTypes'
import ProjectNav from '../components/ProjectNav/ProjectNav'
import RightNav from '../components/RightNav/RightNav'
import { useRouter } from 'next/router'
import Footer from '../components/Footer/Footer'
import Preloader from '../components/Preloader'
import gsap from 'gsap'

type Props = {
    data: homePageData
}

const IndexPage: React.FC<Props> = ({ data }) => {
    const { selectedProjects } = data
    const [showPreloader, setShowPreloader] = useState(false)
    const [isPreloaderComplete, setIsPreloaderComplete] = useState(false)
    const [showMainContent, setShowMainContent] = useState(false)
    const [canPreloadImages, setCanPreloadImages] = useState(false)
    const [autoExpandRightNav, setAutoExpandRightNav] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // 检查 localStorage 中是否存在标记
        const hasVisited = localStorage.getItem('hasVisited')

        if (!hasVisited) {
            setShowPreloader(true)
            // 3秒后显示主内容
            const showContentTimer = setTimeout(() => {
                setShowMainContent(true)
                localStorage.setItem('hasVisited', 'true') // 设置标记，表示用户已访问
            }, 3000)

            return () => {
                clearTimeout(showContentTimer)
            }
        } else {
            // 如果用户已访问，直接显示主内容
            setShowMainContent(true)
            setCanPreloadImages(true)
        }
    }, [])

    const handlePreloaderComplete = () => {
        setIsPreloaderComplete(true)
    }

    const handleIntroVideoStart = () => {
        setCanPreloadImages(true)
    }

    const [filter, setFilter] = useState('All Works')
    const [prevFilter, setPrevFilter] = useState(null)
    const projectsContainerRef = useRef(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [isFilterChanging, setIsFilterChanging] = useState(false)
    const [previousFilter, setPreviousFilter] = useState('Selected Awards')
    const projectItemsRef = useRef([])

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (url.startsWith('/#work-section')) {
                const filterParam = new URLSearchParams(url.split('?')[1]).get(
                    'filter'
                )
                switch (filterParam) {
                    case 'industrial-design':
                        setFilter('Industrial Design')
                        break
                    case 'graphic-design':
                        setFilter('Graphic Design')
                        break
                    default:
                        setFilter('All Works')
                }

                setTimeout(() => {
                    const workSection = document.getElementById('work-section')
                    if (workSection) {
                        workSection.scrollIntoView({ behavior: 'smooth' })
                    }
                }, 100)
            }
        }

        router.events.on('routeChangeComplete', handleRouteChange)

        // 初始加载时也检查 URL
        handleRouteChange(router.asPath)

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router])

    useEffect(() => {
        if (!canPreloadImages) return

        const totalImages = selectedProjects.reduce((acc, project) => {
            return acc + (project.image ? 1 : 0)
        }, 0)

        if (totalImages === 0) {
            setLoadingProgress(100)
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        setLoadingProgress(0)

        let loadedImages = 0

        const preloadImage = (src: string) => {
            return new Promise((resolve) => {
                const img = document.createElement('img')
                img.src = src.startsWith('/') ? src : `/${src}`
                img.onload = img.onerror = () => {
                    loadedImages++
                    setLoadingProgress((loadedImages / totalImages) * 100)
                    resolve(null)
                }
            })
        }

        const preloadImages = async () => {
            const imagePromises = selectedProjects
                .filter((project) => project.image)
                .map((project) => preloadImage(project.image))

            let timeoutId: ReturnType<typeof setTimeout> | undefined
            const timeoutPromise = new Promise((resolve) => {
                timeoutId = setTimeout(() => {
                    console.warn('Loading timed out')
                    resolve(null)
                }, 10000)
            })

            await Promise.race([Promise.all(imagePromises), timeoutPromise])

            if (timeoutId) {
                clearTimeout(timeoutId)
            }

            setIsLoading(false)
        }

        preloadImages()
    }, [selectedProjects, canPreloadImages])

    const handleSkip = () => {
        setIsLoading(false)
    }

    useEffect(() => {
        const handleInitialScroll = () => {
            const urlParams = new URLSearchParams(window.location.search)
            const section = urlParams.get('section')
            if (section === 'work') {
                setTimeout(() => {
                    const workSection = document.getElementById('work-section')
                    if (workSection) {
                        workSection.scrollIntoView({ behavior: 'smooth' })
                    }
                }, 300)
            }
        }

        handleInitialScroll()

        router.events.on('routeChangeComplete', handleInitialScroll)

        return () => {
            router.events.off('routeChangeComplete', handleInitialScroll)
        }
    }, [router])

    const handleLabelClick = (label) => {
        if (label === filter) return
        
        // 记录前一个过滤器
        setPreviousFilter(filter)
        setIsFilterChanging(true)
        
        // 创建移出动画
        const timeline = gsap.timeline({
            onComplete: () => {
                // 动画完成后更新过滤器
                setFilter(label)
                
                // 在下一帧中创建移入动画
                setTimeout(() => {
                    // 获取所有新的项目元素
                    const newItems = document.querySelectorAll(`.${styles.caseStudyCol}`)
                    
                    gsap.fromTo(
                        newItems,
                        {
                            opacity: 0,
                            y: 50,
                            scale: 0.95
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.5,
                            stagger: 0.1,
                            ease: "power2.out",
                            onComplete: () => {
                                setIsFilterChanging(false)
                            }
                        }
                    )
                }, 0)
            }
        })
        
        // 选择当前显示的项目
        const currentItems = document.querySelectorAll(`.${styles.caseStudyCol}`)
        
        // 确定移动方向 (向左或向右)
        const moveDirection = label === 'All Works' ? -100 : 
                            (label === 'Industrial Design' && filter === 'All Works') ? 100 : 
                            (label === 'Graphic Design' && filter !== 'Graphic Design') ? 100 : -100
        
        // 执行移出动画
        timeline.to(currentItems, {
            opacity: 0,
            x: moveDirection,
            scale: 0.95,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.in"
        })
    }

    const filteredProjects = selectedProjects
        .filter((project) => {
            if (filter === 'All Works') return true 
            if (filter === 'Selected Awards') return true
            return project.types === filter
        })
        .sort((a, b) => a.order - b.order) // 按 order 升序排序

    const handleProjectSelect = (projectId: string) => {}

    useEffect(() => {
        if (!canPreloadImages) return

        const preloadProjectsInViewport = () => {
            // 预加载当前视口附近的图片
            const viewportHeight = window.innerHeight
            const preloadMargin = viewportHeight * 2 // 预加载视口上下2倍高度范围内的图片
            
            filteredProjects.forEach(project => {
                const projectEl = document.querySelector(`[data-project-id="${project.slug}"]`)
                if (projectEl) {
                    const rect = projectEl.getBoundingClientRect()
                    const isNearViewport = rect.top < viewportHeight + preloadMargin && rect.bottom > -preloadMargin
                    
                    if (isNearViewport && project.image) {
                        const img = new Image()
                        img.src = project.image.startsWith('/') ? project.image : `/${project.image}`
                    }
                }
            })
        }
        
        preloadProjectsInViewport()
        window.addEventListener('scroll', preloadProjectsInViewport)
        
        return () => window.removeEventListener('scroll', preloadProjectsInViewport)
    }, [filteredProjects, canPreloadImages])

    return (
        <StoreProvider>
            {showPreloader && !isPreloaderComplete && (
                <Preloader
                    onComplete={handlePreloaderComplete}
                    onVideoReady={handleIntroVideoStart}
                />
            )}
            {showMainContent && (
                <>
                    <RightNav autoExpand={autoExpandRightNav} />
                    <Layout>
                        <BasicMeta url={'/'} />
                        {/* Page wrapper for two-column layout */}
                        <div className={styles.container}>
                            <div
                                className={styles.pageWrapper}
                                id="page-wrapper"
                            >
                                {/* Left-side Navigation */}
                                <div className={styles.leftNav}>
                                    <ProjectNav
                                        projects={selectedProjects}
                                        onSelect={handleProjectSelect}
                                    />
                                </div>
                            </div>

                            <BasicMeta url={'/work'} />
                            <section
                                id="work-section"
                                className={cn(
                                    'sectionSpacing',
                                    styles.selectedWorkContainer
                                )}
                            >
                                <div className="container">
                                    <div className="grid" ref={projectsContainerRef}>
                                        <div>
                                            <StaggeredTitle
                                                label1="All Works"
                                                label2="Industrial Design"
                                                label3="Graphic Design"
                                                classname={styles.projTitle}
                                                onLabelClick={handleLabelClick}
                                                activeLabel={filter}
                                            />
                                        </div>
                                        {filteredProjects.map((proj, idx: number) => (
                                            <div
                                                key={`${filter}-${proj.slug}-${idx}`}
                                                className={cn(
                                                    'col-12 col-sm-6',
                                                    styles.caseStudyCol,
                                                    {
                                                        [styles.offsetCol]:
                                                            idx === 1,
                                                    }
                                                )}
                                                style={{opacity: isFilterChanging ? 0 : 1}}
                                            >
                                                <CaseStudy {...proj} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Footer />
                            </section>
                        </div>
                    </Layout>
                </>
            )}
        </StoreProvider>
    )
}

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
    const data = await gePageData('homepage') // 确保 gePageData 是异步的
    return {
        props: {
            data,
        },
    }
}
