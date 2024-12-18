/* eslint-disable react/no-children-prop */
import * as React from 'react'
import styles from './index.module.scss'
import Layout from '../components/Layout/Layout'
import cn from 'classnames'
import { useState, useEffect } from 'react'
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

type Props = {
    data: homePageData
}

const IndexPage: React.FC<Props> = ({ data }) => {
    const { selectedProjects } = data
    const [showPreloader, setShowPreloader] = useState(false)
    const [isPreloaderComplete, setIsPreloaderComplete] = useState(false)
    const [showMainContent, setShowMainContent] = useState(false)
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
        }
    }, [])

    const handlePreloaderComplete = () => {
        setIsPreloaderComplete(true)
    }

    const [filter, setFilter] = useState('All Works') // 添加过滤状态
    const [isLoading, setIsLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)

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
        const totalImages = selectedProjects.reduce((acc, project) => {
            return acc + (project.image ? 1 : 0)
        }, 0)

        let loadedImages = 0

        const preloadImage = (src: string) => {
            return new Promise((resolve) => {
                const img = document.createElement('img')
                img.src = src
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

            // 设置最长加载时间
            const timeoutPromise = new Promise((resolve) => {
                setTimeout(() => {
                    console.warn('Loading timed out')
                    resolve(null)
                })
            })

            // 等待所有图片加载完成或超时
            await Promise.race([Promise.all(imagePromises), timeoutPromise])

            setIsLoading(false)
        }

        preloadImages()
    }, [selectedProjects])

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

    const handleLabelClick = (label: string) => {
        setFilter(label)
        let filterParam = ''
        if (label === 'Industrial Design') filterParam = 'industrial-design'
        else if (label === 'Graphic Design') filterParam = 'graphic-design'

        if (filterParam) {
            router.push(`/#work-section?filter=${filterParam}`, undefined, {
                shallow: true,
            })
        } else {
            router.push('/#work-section', undefined, { shallow: true })
        }
    }
    const filteredProjects = selectedProjects
        .filter((project) => {
            if (filter === 'All Works') return true
            return project.types === filter
        })
        .sort((a, b) => a.order - b.order) // 按 order 升序排序

    const handleProjectSelect = (projectId: string) => {}

    return (
        <StoreProvider>
            {showPreloader && !isPreloaderComplete && (
                <Preloader onComplete={handlePreloaderComplete} />
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
                                <div className="grid">
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
                                    {filteredProjects.map(
                                        (proj, idx: number) => (
                                            <div
                                                key={idx}
                                                className={cn(
                                                    'col-12 col-sm-6',
                                                    styles.caseStudyCol,
                                                    {
                                                        [styles.offsetCol]:
                                                            idx === 1,
                                                    }
                                                )}
                                            >
                                                <CaseStudy {...proj} />
                                            </div>
                                        )
                                    )}
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
