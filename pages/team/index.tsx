/* eslint-disable react/no-children-prop */
import * as React from 'react'
import styles from './team.module.scss'
import cn from 'classnames'
import Layout from '../../components/Layout/Layout'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import { StoreProvider } from '../../utils/StoreProvider'
import { gePageData } from '../../utils/pages'
import BasicMeta from '../../utils/BasicMeta'
import { aboutPageData, selectedProject } from '../../utils/customTypes'
import RightNav from '../../components/RightNav/RightNav'
import logoSrc from '../../public/assets/images/ffandesign.svg'
import Image from 'next/image'
import Footer from '../../components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

type Props = {
    data: aboutPageData
    projData: selectedProject[]
}
const Team: React.FC<Props> = ({ data }) => {
    const { intro, description } = data
    const refTitle = React.createRef<HTMLSpanElement>()

    useEffect(() => {
        if (refTitle.current) {
            // gsap.set(refTitle.current, { opacity: 1, yPercent: 100 })
            // gsap.to(refTitle.current, {
            //     duration: 1,
            //     yPercent: 0,
            //     ease: 'power4',
            //     delay: 0.2,
            // })
            // gsap.set('.fade-in-up-bio', { opacity: 1 })
            // gsap.fromTo(
            //     '.fade-in-up-bio',
            //     { opacity: 0, y: 40 },
            //     {
            //         delay: 0.5,
            //         opacity: 1,
            //         duration: 0.6,
            //         y: 0,
            //     }
            // )
            // ScrollTrigger.create({
            //     trigger: '.logo-container', // 目标触发元素
            //     start: 'top top', // 在滚动到 contentContainer 的顶部触发动画
            //     end: 'bottom 100px', // 结束位置
            //     scrub: true, // 允许平滑滚动
            //     pin: '.logo', // 固定 lo
            //     pinSpacing: false, // 禁用 pinSpacing 以避免额外的空白
            // })
            ScrollTrigger.create({
                trigger: 'content-container',
                start: 'top top+=15vh', // 在滚动到 contentContainer 的顶部触发动画
                end: 'bottom bottom+1vh', // 滚动到页面底部时结束
                scrub: true, // 允许平滑滚动
                pin: '.logo-container', // 固定 logo

                //    onLeaveBack: () =>
                //         gsap.to('.logo-container', { yPercent: -300 }), // 向下滚动时恢复 logo 位置
            })
        }
    }, [])
    return (
        <StoreProvider>
            <Layout>
                <BasicMeta url={'/team'} />

                <RightNav />
                <div className={cn(styles.heroContainer)}>
                    <div className={cn('logo-container', styles.logoContainer)}>
                        <Image
                            src={logoSrc}
                            alt="FFAN Design Logo"
                            className={cn('logo', styles.logo)}
                        />
                    </div>
                    <div
                        className={cn(
                            'content-container',
                            styles.contentContainer
                        )}
                    >
                        <div className="grid">
                            <div
                                className={
                                    'col-12 col-start-sm-1 col-end-sm-6 col-start-md-1 col-end-md-6 col-start-lg-1 col-end-lg-6'
                                }
                            >
                                <h1 className={styles.title}>
                                    <span ref={refTitle} className="work-proj">
                                        ABOUT US
                                    </span>
                                </h1>
                                <ReactMarkdown
                                    className={cn(
                                        'fade-in-up-bio',
                                        styles.descBio
                                    )}
                                >
                                    {intro}
                                </ReactMarkdown>
                            </div>
                            <div></div>
                            <div
                                className={
                                    'col-12 col-start-sm-7 col-end-sm-12 col-start-md-7 col-end-md-12 col-start-lg-7 col-end-lg-12'
                                }
                            >
                                <h1 className={styles.title}>
                                    <span ref={refTitle} className="work-proj">
                                        OUR WORKS
                                    </span>
                                </h1>
                                <ReactMarkdown
                                    className={cn(
                                        'fade-in-up-bio',
                                        styles.descBio
                                    )}
                                >
                                    {description}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
                <section
                    className={cn(
                        'grid sectionSpacing',
                        styles.moreWorksSection
                    )}
                >
                    <div
                        className={cn(
                            'col-12 col-sm-6 col-md-7',
                            styles.skillsGrid
                        )}
                    ></div>
                </section>

                {/* <section
                    className={cn('grid sectionSpacing', styles.cvSection)}
                >
                    <div
                        className="col-12 col-start-sm-7 col-end-sm-12 col-start-md-6 col-end-md-12
              col-start-lg-6
              col-end-lg-12"
                    >
                        <RoundLink
                            label={'My CV'}
                            url={'https://gottaegbert.github.io/Siyu-hu-CV/'}
                            classname={styles.cvLink}
                        />
                    </div>
                </section>

                <section
                    className={cn(
                        'grid sectionSpacing',
                        styles.moreWorksSection
                    )}
                >
                    <div className={'col-12 col-sm-6 col-md-7'}>
                        {projData.map((work, idx: number) => (
                            <Work {...work} key={'work' + idx} />
                        ))}
                    </div>
                </section> */}
                <Footer />
            </Layout>
        </StoreProvider>
    )
}

export default Team

export const getStaticProps: GetStaticProps = async () => {
    const data = gePageData('about')
    const projData = gePageData('homepage').selectedProjects

    return {
        props: {
            data,
            projData,
        },
    }
}
