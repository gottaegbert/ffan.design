/* eslint-disable react/no-children-prop */
import * as React from 'react'
import styles from './contact.module.scss'
import cn from 'classnames'
import Layout from '../../components/Layout/Layout'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import { StoreProvider } from '../../utils/StoreProvider'
import { gePageData } from '../../utils/pages'
import BasicMeta from '../../utils/BasicMeta'
import { aboutPageData, selectedProject } from '../../utils/customTypes'
import RightNav from '../../components/RightNav/RightNav'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

type Props = {
    data: aboutPageData
    projData: selectedProject[]
}
const Contact: React.FC<Props> = ({ data }) => {
    const { ourservice1, ourservice2 } = data

    return (
        <StoreProvider>
            <Layout>
                <BasicMeta url={'/team'} />
                <RightNav />

                <div className={cn(styles.heroContainer)}>
                    <div
                        className={cn(
                            'content-container',
                            styles.contentContainer
                        )}
                    >
                        <div className="grid">
                            <div className={styles.intro}></div>
                            <h1>We are ffan.design.</h1>
                            <h1>
                                Our business encompasses industrial design,
                                graphic design, and overall creative design
                                solutions.
                            </h1>

                            <div className={styles.value}>
                                Creative · Reliable · Professional · Fast ·
                                Affordable
                            </div>
                            <div
                                className={
                                    'col-12 col-start-sm-1 col-end-sm-6 col-start-md-1 col-end-md-6 col-start-lg-1 col-end-lg-6'
                                }
                            >
                                <ReactMarkdown
                                    className={cn(
                                        'fade-in-up-bio',
                                        styles.descBio
                                    )}
                                >
                                    {ourservice1}
                                </ReactMarkdown>
                            </div>
                            <div></div>
                            <div
                                className={
                                    'col-12 col-start-sm-7 col-end-sm-12 col-start-md-7 col-end-md-12 col-start-lg-7 col-end-lg-12'
                                }
                            >
                                <h1 className={styles.title}></h1>
                                <ReactMarkdown
                                    className={cn(
                                        'fade-in-up-bio',
                                        styles.descBio
                                    )}
                                >
                                    {ourservice2}
                                </ReactMarkdown>
                            </div>

                            <div className={styles.contactblock}>
                                <div className={styles.contact}>Contact Us</div>
                                <div className={styles.contact}>
                                    We welcome you to leave message to us to
                                    make our ideas come true
                                </div>
                                <br />

                                <div className={styles.contactlinkContainer}>
                                    <Link
                                        href="https://www.instagram.com/ffan.design/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.contactlink}
                                    >
                                        Instagram: ffan.design
                                    </Link>
                                    <a
                                        href="mailto:ffandesign.info@gmail.com"
                                        className={styles.contactlink}
                                    >
                                        Email: ffandesign.info@gmail.com
                                    </a>
                                    <div className={styles.contactlink}>
                                        Phone: +86 13260458928
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </StoreProvider>
    )
}

export default Contact

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
