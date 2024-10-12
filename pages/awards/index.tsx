/* eslint-disable react/no-children-prop */
import * as React from 'react'
import styles from './awards.module.scss'
import Layout from '../../components/Layout/Layout'
import cn from 'classnames'
import { useState } from 'react'
import StaggeredTitle from '../../components/StaggeredTitle/StaggeredTitle'
import AwardsCase from '../../components/AwardsCase/AwardsCase'
import { GetStaticProps } from 'next'
import { StoreProvider } from '../../utils/StoreProvider'
import BasicMeta from '../../utils/BasicMeta'
import { homePageData } from '../../utils/customTypes'
import RightNav from '../../components/RightNav/RightNav'
import Footer from '../../components/Footer/Footer'
import { gePageData } from '../../utils/pages'

type Props = {
    data: homePageData
}

const Awards: React.FC<Props> = ({ data }) => {
    const { selectedAwards } = data
    const [filter, setFilter] = useState('Selected Awards')

    const handleLabelClick = (label) => {
        setFilter(label)
    }

    const filteredProjects = selectedAwards.filter((project) => {
        if (filter === 'Selected Awards') return true
        return project.types === filter
    })

    const isLargeItem = (index: number) => {
        return index % 5 === 0 || index % 5 === 1
    }

    const isLastLargeItem = (index: number) => {
        return index % 5 === 1
    }

    return (
        <StoreProvider>
            <RightNav />
            <Layout>
                <div className={styles.container}>
                    <BasicMeta url={'/awards'} />
                    <section id="work-section" className={cn('sectionSpacing', styles.selectedWorkContainer)}>
                        <div className="grid">
                            <div className={cn('col-12', styles.titleContainer)}>
                                <StaggeredTitle
                                    label1="Selected Awards"
                                    label2="Industrial Design"
                                    label3="Graphic Design"
                                    activeLabel={filter}
                                    classname={styles.projTitle}
                                    onLabelClick={handleLabelClick}
                                />
                            </div>
                            {filteredProjects.map((proj, idx: number) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        isLargeItem(idx) ? 'col-12' : 'col-12 col-sm-4',
                                        styles.awardItem,
                                        { [styles.lastLargeItem]: isLastLargeItem(idx) }
                                    )}
                                >
                                    <AwardsCase {...proj} isLargeItem={isLargeItem(idx)} />
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

export default Awards

export const getStaticProps: GetStaticProps = async () => {
    const data = gePageData('homepage')
    return {
        props: {
            data,
        },
    }
}
