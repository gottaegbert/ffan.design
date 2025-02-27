import * as React from 'react'
import styles from './project.module.scss'
import cn from 'classnames'
import { gsap } from 'gsap'
import { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout/Layout'
import Work from '../../components/Work/Work'
import ReactMarkdown from 'react-markdown'
import { StoreProvider } from '../../utils/StoreProvider'
import { gePageData } from '../../utils/pages'
import BasicMeta from '../../utils/BasicMeta'
import { project, selectedProject } from '../../utils/customTypes'
import Image from 'next/legacy/image'
import RightNav from '../../components/RightNav/RightNav'
import { useRef } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

type Props = {
    data: project
    moreProjs: project[]
    slug: string
}

const ProjectPage: React.FC<Props> = ({ data, moreProjs, slug }) => {
    const title = React.createRef<HTMLDivElement>()
    const imgForeground = React.createRef<HTMLDivElement>()
    const hasVideo = data.video && data.video.length > 0
    const isBilibiliVideo = hasVideo && data.video.includes('bilibili.com')
    const isVimeoVideo = hasVideo && data.video.includes('vimeo.com')

    const getBilibiliVideoId = (url) => {
        const match = url.match(/\/BV(\w+)/)
        return match ? match[1] : null
    }

    const getVimeoVideoId = (url) => {
        const match = url.match(/vimeo\.com\/(\d+)/)
        return match ? match[1] : null
    }
    useEffect(() => {
        gsap.to(imgForeground.current, {
            duration: 1,
            width: 0,
            ease: 'power4',
            stagger: 0.2,
            delay: 0.2,
        })
    }, [])

    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const scrollToProject = (direction: 'prev' | 'next') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const containerWidth = container.offsetWidth
            const itemWidth = containerWidth / 2 // 假设每次显示两个项目
            const gap = 48 // 项目之间的间隙

            // 获取当前滚动位置和当前项目索引
            const scrollLeft = container.scrollLeft
            const nearestIndex = Math.round(scrollLeft / (itemWidth + gap))

            let targetIndex
            if (direction === 'next') {
                targetIndex = (nearestIndex + 1) % moreProjs.length // 循环到第一个项目
            } else {
                targetIndex =
                    (nearestIndex - 1 + moreProjs.length) % moreProjs.length // 循环到最后一个项目
            }

            const targetScrollLeft = targetIndex * (itemWidth + gap)

            container.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth',
            })
        }
    }

    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        const handleScrollEnd = () => {
            const scrollLeft = container.scrollLeft
            const containerWidth = container.clientWidth
            const itemWidth = containerWidth / 2
            const gap = 48

            const nearestIndex = Math.round(scrollLeft / (itemWidth + gap))
            const targetScrollLeft = nearestIndex * (itemWidth + gap)

            if (Math.abs(scrollLeft - targetScrollLeft) > 1) {
                container.scrollTo({
                    left: targetScrollLeft,
                    behavior: 'smooth',
                })
            }
        }

        container.addEventListener('scrollend', handleScrollEnd)

        return () => {
            container.removeEventListener('scrollend', handleScrollEnd)
        }
    }, [])

    const isMobile = useResponsive()

    return (
        <StoreProvider>
            <Layout>
                <BasicMeta url={slug} />
                <RightNav />
                <div className={styles.container}>
                    <section className={cn('grid')}>
                        <div className={styles.typeHeader}>
                            <div>{data.types}</div>
                            <div>[{data.tags}]</div>
                        </div>
                    </section>
                </div>

                <section className={cn('grid')}>
                    {hasVideo ? (
                        isBilibiliVideo ? (
                            <div
                                style={{
                                    position: 'relative',
                                    paddingTop: '56.25%',
                                    width: '100%',
                                }}
                            >
                                <iframe
                                    src={`https://player.bilibili.com/player.html?bvid=${getBilibiliVideoId(data.video)}&page=1&high_quality=1&danmaku=0`}
                                    allowFullScreen={true}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    frameBorder="0"
                                    sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
                                ></iframe>
                            </div>
                        ) : isVimeoVideo ? (
                            <div
                                style={{
                                    padding: '56.25% 0 0 0',
                                    position: 'relative',
                                }}
                            >
                                <iframe
                                    src={`https://player.vimeo.com/video/${getVimeoVideoId(data.video)}?h=00000000&autoplay=1&loop=1&title=0&byline=0&portrait=0`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <video
                                src={`/${data.video}`}
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                width="100%"
                            />
                        )
                    ) : data.image ? (
                        <div className={styles.imageContainer}>
                            <Image
                                src={`/${data.image}`}
                                alt={data.title}
                                layout="responsive"
                                height={9}
                                width={16}
                                objectFit="contain"
                                placeholder="blur"
                                priority
                                blurDataURL={`/${data.image}`}
                                className={styles.projImage}
                            />
                            <div
                                ref={imgForeground}
                                className={styles.imgForeground}
                            ></div>
                        </div>
                    ) : null}

                    <div className={styles.prjTitleContainer}>
                        <h1 className={styles.title}>
                            <span>
                                <span ref={title} className={styles.titleSpan}>
                                    {data.title}
                                </span>
                                <div className={styles.inlineContainer}>
                                    <span
                                        ref={title}
                                        className={styles.titleSpan}
                                    >
                                        {data.date}
                                    </span>
                                    <span
                                        ref={title}
                                        className={styles.titleSpan}
                                    >
                                        DESIGNER: {data.designer}
                                    </span>
                                </div>
                            </span>
                        </h1>
                    </div>
                    <div className={cn('col-9', styles.description)}>
                        <ReactMarkdown>{data.description}</ReactMarkdown>
                    </div>

                    {/* content */}

                    {data.imageContent && (
                        <>
                            <div className={styles.imageContainer}>
                                {data.imageContent.map(
                                    (content, idx: number) => {
                                        const isVideo = content.endsWith('.mp4')

                                        return (
                                            <React.Fragment key={idx}>
                                                <div
                                                    className={cn(
                                                        styles.skillsCell,
                                                        'fade-in-up'
                                                    )}
                                                >
                                                    {isVideo ? (
                                                        <div
                                                            className={
                                                                styles.imageContainer
                                                            }
                                                        >
                                                            <video
                                                                src={`/${content}`}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                controls={false}
                                                                width="100%"
                                                                className={
                                                                    styles.projImage
                                                                }
                                                            />
                                                            <div
                                                                style={{
                                                                    marginTop:
                                                                        '12px',
                                                                }}
                                                            ></div>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={
                                                                styles.imageContainer
                                                            }
                                                        >
                                                            <Image
                                                                src={`/${content}`}
                                                                alt={data.title}
                                                                layout="responsive"
                                                                height={9}
                                                                width={16}
                                                                objectFit="contain"
                                                                placeholder="blur"
                                                                blurDataURL={`/${content}`}
                                                                className={
                                                                    styles.projImage
                                                                }
                                                            />
                                                            <div
                                                                style={{
                                                                    marginTop:
                                                                        isMobile
                                                                            ? idx ===
                                                                              0
                                                                                ? '7.5px'
                                                                                : '15px'
                                                                            : idx ===
                                                                                0
                                                                              ? '12px'
                                                                              : '24px',
                                                                }}
                                                            ></div>
                                                        </div>
                                                    )}
                                                </div>
                                                {idx === 0 &&
                                                    data.designconcept && (
                                                        <div
                                                            className={cn(
                                                                'grid',
                                                                styles.designConcept
                                                            )}
                                                        >
                                                            <p
                                                                className={cn(
                                                                    'col-3'
                                                                )}
                                                            >
                                                                Design Concept
                                                            </p>
                                                            <p
                                                                className={cn(
                                                                    'col-9'
                                                                )}
                                                            >
                                                                {
                                                                    data.designconcept
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                            </React.Fragment>
                                        )
                                    }
                                )}
                            </div>
                        </>
                    )}

                    <div className={cn('col-12', styles.divider)}></div>
                </section>
                <section
                    className={cn(
                        'grid sectionSpacing',
                        styles.moreWorksSection
                    )}
                >
                    <div className={styles.navigationButtons}>
                        <button
                            onClick={() => scrollToProject('prev')}
                            className={styles.navButton}
                        >
                            ← Previous
                        </button>
                        <button
                            onClick={() => scrollToProject('next')}
                            className={styles.navButton}
                        >
                            Next →
                        </button>
                    </div>
                    <div
                        ref={scrollContainerRef}
                        className={styles.horizontalScrollContainer}
                    >
                        {moreProjs.map((work, idx: number) => (
                            <Work {...work} key={'work' + idx} />
                        ))}
                    </div>
                </section>
            </Layout>
        </StoreProvider>
    )
}

export default ProjectPage

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const data = await gePageData('projects').projects.filter(
        // @ts-ignore
        (el: project) =>
            el.slug.toString().toLowerCase() ==
            params?.pageSlug?.toString().toLowerCase()
    )[0]

    const homeData = await gePageData('projects')
    const selectedPjs = homeData.projects.filter(
        (el: project) => el.slug !== `/projects/${params?.pageSlug}`
    )
    // const works = homeData.moreWorks;
    const moreProjs = [...selectedPjs]
    const slug = params?.pageSlug

    return {
        props: {
            data,
            moreProjs,
            slug,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await gePageData('homepage')
        .selectedProjects.map((pj: selectedProject) => pj.slug)
        .map((el: string) => el.split('/')[2])
    return {
        paths: slugs.map((el: string) => {
            return { params: { pageSlug: el } }
        }),
        fallback: false,
    }
}
