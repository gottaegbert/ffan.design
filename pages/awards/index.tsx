/* eslint-disable react/no-children-prop */
import * as React from 'react'
import styles from './awards.module.scss'
import Layout from '../../components/Layout/Layout'
import cn from 'classnames'
import { useState, useRef, useEffect } from 'react'
import StaggeredTitle from '../../components/StaggeredTitle/StaggeredTitle'
import AwardsCase from '../../components/AwardsCase/AwardsCase'
import { GetStaticProps } from 'next'
import { StoreProvider } from '../../utils/StoreProvider'
import BasicMeta from '../../utils/BasicMeta'
import { homePageData } from '../../utils/customTypes'
import RightNav from '../../components/RightNav/RightNav'
import Footer from '../../components/Footer/Footer'
import { gePageData } from '../../utils/pages'
import { useResponsive } from '../../hooks/useResponsive'
import gsap from 'gsap'

type Props = {
    data: homePageData
}

const Awards: React.FC<Props> = ({ data }) => {
    const { selectedAwards } = data
    const [filter, setFilter] = useState('Selected Awards')
    const isMobile = useResponsive()
    const [isFilterChanging, setIsFilterChanging] = useState(false)
    const [previousFilter, setPreviousFilter] = useState('Selected Awards')
    const awardsContainerRef = useRef(null)

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
                    const newItems = document.querySelectorAll(`.${styles.awardItem}`)
                    
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
        const currentItems = document.querySelectorAll(`.${styles.awardItem}`)
        
        // 确定移动方向 (向左或向右)
        const moveDirection = label === 'Selected Awards' ? -100 : 
                            (label === 'Industrial Design' && filter === 'Selected Awards') ? 100 : 
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

    const filteredProjects = selectedAwards
        .filter((project) => {
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
                    <section
                        id="work-section"
                        className={cn(
                            'sectionSpacing',
                            styles.selectedWorkContainer
                        )}
                    >
                        <div className="grid" ref={awardsContainerRef}>
                            <div
                                className={cn('col-12', styles.titleContainer)}
                            >
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
                                    key={`${filter}-${idx}`}
                                    className={cn(
                                        {
                                            'col-12': true,
                                            'col-sm-4':
                                                !isMobile && !isLargeItem(idx),
                                        },
                                        styles.awardItem,
                                        {
                                            [styles.largeGridItem]:
                                                !isMobile && isLargeItem(idx),
                                            [styles.smallGridItem]:
                                                !isMobile && !isLargeItem(idx),
                                            [styles.lastLargeItem]:
                                                !isMobile &&
                                                isLastLargeItem(idx),
                                        }
                                    )}
                                    style={{opacity: isFilterChanging ? 0 : 1}}
                                >
                                    <AwardsCase
                                        {...proj}
                                        isLargeItem={
                                            !isMobile && isLargeItem(idx)
                                        }
                                    />
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
