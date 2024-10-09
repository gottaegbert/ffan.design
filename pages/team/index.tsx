/* eslint-disable react/no-children-prop */
import * as React from 'react'
import styles from './team.module.scss'
import cn from 'classnames'
import Layout from '../../components/Layout/Layout'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
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
    const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});
    const spaceRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const toggleDescription = (idx: number) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    useEffect(() => {
        if (spaceRef.current && containerRef.current) {
            gsap.fromTo(spaceRef.current, 
                { height: '20vh' },
                {
                    height: '0vh',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: '+=20%',
                        scrub: true,
                    }
                }
            )
        }
    }, [])

    const { aboutus, ourwork } = data
    const refTitle = React.createRef<HTMLSpanElement>()

    return (
        <StoreProvider>
            <Layout>
                <BasicMeta url={'/team'} />

                <RightNav />
                <div ref={containerRef} className={cn(styles.heroContainer)}>
                    <div className={cn('logo-container', styles.logoContainer)}>
                        <Image
                            src={logoSrc}
                            alt="FFAN Design Logo"
                            className={cn('logo', styles.logo)}
                        />
                    </div>
                    <div 
                        ref={spaceRef}
                        className={styles.space}
                    ></div>
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
                                    {aboutus}
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
                                    {ourwork}
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

                <section>
                    <div className={cn(styles.teamGrid)}>
                        {data.teams.map((team, idx: number) => (
                            <div 
                                className={cn(styles.teamMember, { [styles.expanded]: expandedDescriptions[idx] })} 
                                key={'team' + idx}
                                onClick={() => toggleDescription(idx)}
                            >
                                <div className={cn('grid', styles.teamMemberHeader)}>
                                   
                                        <h4 className={cn('col-12 col-start-sm-1 col-end-sm-2 col-start-md-1 col-end-md-2 col-start-lg-1 col-end-lg-2')}>
                                            {team.Role}
                                            </h4>
                                        <h4 className={cn('col-12 col-start-sm-11 col-end-sm-12 col-start-md-11 col-end-md-12 col-start-lg-11 col-end-lg-12')}>{team.Name}</h4>
                               
                                </div>
                                <div className={cn('grid',styles.descriptionContainer)}>
                                    <rect className={cn('col-12 col-start-3 col-end-7',styles.image)}>
                                    </rect>
                                    <div className={cn('col-12 col-start-9 col-end-12',styles.description)}>
                                    <ReactMarkdown
                                        components={{
                                            p: ({ children }) => {
                                                const content = children
                                                    .map(child => (typeof child === 'string' ? child : ''))
                                                    .join('');
                                                
                                                if (content.includes('[TIME]')) {
                                                    return <CustomRenderer value={content} />;
                                                }
                                                return <p>{children}</p>;
                                            },
                                        }}
                                    >
                                        {team.Description}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <Footer />

            
            </Layout>
        </StoreProvider>
    )
}

const CustomRenderer = ({ value }: { value: string }) => {
    const parts = value.split(/\[TIME\](.*?)\[\/TIME\]/g);
    return (
        <div className={styles.workExperiences}>
            {parts.map((part, index) => {
                if (index % 2 === 0) return null; // 跳过空字符串
                return (
                    <div key={index} className={styles.experienceItem}>
                        <div className={styles.timeColumn}>{part}</div>
                        <div className={styles.descriptionColumn}>{parts[index + 1]?.trim()}</div>
                    </div>
                );
            })}
        </div>
    );
};

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
