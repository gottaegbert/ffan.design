/* eslint-disable react/no-children-prop */
import * as React from 'react'
import styles from './index.module.scss'
import Layout from '../components/Layout/Layout'
import cn from 'classnames'
import { useState } from 'react'
import StaggeredTitle from '../components/StaggeredTitle/StaggeredTitle'
import CaseStudy from '../components/CaseStudy/CaseStudy'
import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import { gePageData } from '../utils/pages' // Corrected typo from gePageData to getPageData
import { StoreProvider } from '../utils/StoreProvider'
import BasicMeta from '../utils/BasicMeta'
import { homePageData } from '../utils/customTypes'
import ProjectNav from '../components/ProjectNav/ProjectNav'
import RightNav from '../components/RightNav/RightNav'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Footer from '../components/Footer/Footer'

type Props = {
    data: homePageData
}

const IndexPage: React.FC<Props> = ({ data }) => {
    const { selectedProjects } = data
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<
        number | null
    >(null)
    const handleProjectSelect = (index: number) => {
        setSelectedProjectIndex(index)
    }

    const [filter, setFilter] = useState('All Works') // 添加过滤状态

    const handleLabelClick = (label) => {
        setFilter(label)
    }
    const filteredProjects = selectedProjects.filter((project) => {
        if (filter === 'All Works') return true
        return project.types === filter
    })

    const router = useRouter()

    useEffect(() => {
        // 检查 URL 中是否有 #work-section
        if (router.asPath === '/#work-section') {
            // 如果有，滚动到 Work 部分
            document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [router.asPath])

    return (
        <StoreProvider>
            <RightNav />
            <Layout>
                <BasicMeta url={'/'} />
                {/* Page wrapper for two-column layout */}
                <div className={styles.container}>
                    <div className={styles.pageWrapper}>
                        {/* Left-side Navigation */}
                        <div className={styles.leftNav}>
                            <ProjectNav
                                projects={selectedProjects} // Pass the selectedProjects from data
                                onSelect={handleProjectSelect} // Pass handler for project selection
                            />
                        </div>
                    </div>

                    <BasicMeta url={'/work'} />
                    {/* <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence> */}
                    <section
                        id="work-section"  // 添加这个 ID
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
                                    onLabelClick={handleLabelClick} // 传递回调函数
                                />
                            </div>
                            {filteredProjects.map((proj, idx: number) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        'col-12 col-sm-6',
                                        styles.caseStudyCol,
                                        {
                                            [styles.offsetCol]: idx === 1,
                                        }
                                    )}
                                >
                                    <CaseStudy {...proj} />
                                </div>
                            ))}
                   
                        </div>
                <Footer />
                    </section>
                </div>
            </Layout>
        </StoreProvider>
    )
}

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
    const data = gePageData('homepage') // Corrected typo
    return {
        props: {
            data,
        },
    }
}
