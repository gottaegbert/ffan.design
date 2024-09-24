/* eslint-disable react/no-children-prop */
import * as React from 'react'
import styles from './about.module.scss'
import cn from 'classnames'
import Layout from '../../components/Layout/Layout'
import Work from '../../components/Work/Work'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect } from 'react'
import RoundLink from '../../components/RoundLink/RoundLink'
import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import { StoreProvider } from '../../utils/StoreProvider'
import { gePageData } from '../../utils/pages'
import BasicMeta from '../../utils/BasicMeta'
import { aboutPageData, selectedProject } from '../../utils/customTypes'

gsap.registerPlugin(ScrollTrigger)

type Props = {
    data: aboutPageData
    projData: selectedProject[]
}
const About: React.FC<Props> = ({ data, projData }) => {
    const { intro, description, skill, avatar } = data
    const refTitle = React.createRef<HTMLSpanElement>()

    useEffect(() => {
        if (refTitle.current) {
            gsap.set(refTitle.current, { opacity: 1, yPercent: 100 })
            gsap.to(refTitle.current, {
                duration: 1,
                yPercent: 0,
                ease: 'power4',
                delay: 0.2,
            })
            gsap.set('.fade-in-up-bio', { opacity: 1 })
            gsap.fromTo(
                '.fade-in-up-bio',
                { opacity: 0, y: 40 },
                {
                    delay: 0.5,
                    opacity: 1,
                    duration: 0.6,
                    y: 0,
                }
            )
        }
    }, [])

    return (
        <StoreProvider>
            <Layout>
                <BasicMeta url={'/about'} />
                <div className={cn(styles.heroContainer)}>
                    <div className="grid">
                        <div
                            className={
                                'col-12 col-start-sm-1 col-end-sm-6 col-start-md-1 col-end-md-6 col-start-lg-1 col-end-lg-6'
                            }
                        >
                            <h1 className={styles.title}>
                                <span ref={refTitle} className="work-proj">
                                    about us
                                </span>
                            </h1>
                            <ReactMarkdown
                                className={cn('fade-in-up-bio', styles.descBio)}
                            >
                                {intro}
                            </ReactMarkdown>
                        </div>
                        <div
                            className={
                                'col-12 col-start-sm-6 col-end-sm-12 col-start-md-6 col-end-md-12 col-start-lg-6 col-end-lg-12'
                            }
                        >
                            <ReactMarkdown
                                className={cn('fade-in-up-bio', styles.descBio)}
                            >
                                {description}
                            </ReactMarkdown>
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
                <section
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
                </section>
            </Layout>
        </StoreProvider>
    )
}

export default About

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
