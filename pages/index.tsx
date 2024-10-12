/* eslint-disable react/no-children-prop */
import * as React from 'react'
import styles from './index.module.scss'
import Layout from '../components/Layout/Layout'
import cn from 'classnames'
import { useState, useEffect } from 'react'
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
import { useRouter } from 'next/router'
import Footer from '../components/Footer/Footer'
import Preloader from '../components/Preloader'
import Image from 'next/image'

type Props = {
    data: homePageData
}

const IndexPage: React.FC<Props> = ({ data }) => {
    const { selectedProjects } = data
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<
        number | null
    >(null)
    const [filter, setFilter] = useState('All Works') // 添加过滤状态
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [imagesLoaded, setImagesLoaded] = useState(0)

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (url.startsWith('/#work-section')) {
                const filterParam = new URLSearchParams(url.split('?')[1]).get('filter');
                if (filterParam === 'industrial-design') {
                    setFilter('Industrial Design');
                } else if (filterParam === 'graphic-design') {
                    setFilter('Graphic Design');
                }
                document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' });
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        // 初始加载时也检查 URL
        handleRouteChange(router.asPath);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    useEffect(() => {
        const totalImages = selectedProjects.reduce((acc, project) => {
            return acc + (project.image ? 1 : 0);
        }, 0);

        const preloadImage = (src: string) => {
            return new Promise((resolve, reject) => {
                const img = document.createElement('img');
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        };

        const preloadImages = async () => {
            for (const project of selectedProjects) {
                if (project.image) {
                    try {
                        await preloadImage(project.image);
                        setImagesLoaded((prev) => {
                            const newLoaded = prev + 1;
                            setLoadingProgress((newLoaded / totalImages) * 100);
                            if (newLoaded === totalImages) {
                                setIsLoading(false);
                            }
                            return newLoaded;
                        });
                    } catch (error) {
                        console.error('Error loading image:', error);
                    }
                }
            }
        };

        preloadImages();
    }, [selectedProjects]);

    if (isLoading) {
        return <Preloader progress={loadingProgress} />;
    }

    const handleLabelClick = (label: string) => {
        setFilter(label);
        let filterParam = '';
        if (label === 'Industrial Design') filterParam = 'industrial-design';
        else if (label === 'Graphic Design') filterParam = 'graphic-design';
        
        if (filterParam) {
            router.push(`/#work-section?filter=${filterParam}`, undefined, { shallow: true });
        } else {
            router.push('/#work-section', undefined, { shallow: true });
        }
    }
    const filteredProjects = selectedProjects.filter((project) => {
        if (filter === 'All Works') return true
        return project.types === filter
    })

    const handleProjectSelect = (projectId: string) => {
        // 在这里添加处理项目选择的逻辑
        console.log('选中的项目ID:', projectId);
    };

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
                                    onLabelClick={handleLabelClick}
                                    activeLabel={filter}
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
