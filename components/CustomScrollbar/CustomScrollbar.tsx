import React, { useEffect, useRef, useState } from 'react'
import styles from './CustomScrollbar.module.scss'

const CustomScrollbar: React.FC = () => {
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [scrollPercentage, setScrollPercentage] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            // 获取实际可滚动容器
            const container =
                document.querySelector('.container') || document.documentElement
            const scrollHeight = container.scrollHeight - window.innerHeight
            const currentScroll = container.scrollTop || window.pageYOffset

            // 确保不会出现负值或超过100的情况
            const newScrollPercentage = Math.min(
                Math.max((currentScroll / scrollHeight) * 100, 0),
                100
            )
            setScrollPercentage(newScrollPercentage)
        }

        // 同时监听 window 和容器的滚动事件
        const container = document.querySelector('.container')
        if (container) {
            container.addEventListener('scroll', handleScroll)
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll() // 初始化滚动条位置

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll)
            }
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (scrollbarRef.current) {
            const scrollbarHeight =
                scrollbarRef.current.parentElement?.clientHeight || 0
            const scrollbarThumbHeight = scrollbarRef.current.clientHeight
            const maxTop = scrollbarHeight - scrollbarThumbHeight
            const newTop = (scrollPercentage / 100) * maxTop

            // 使用 transform 代替 top 属性以获得更好的性能
            scrollbarRef.current.style.transform = `translateY(${newTop}px)`
        }
    }, [scrollPercentage])

    return (
        <div className={styles.customScrollbarContainer}>
            <div ref={scrollbarRef} className={styles.customScrollbar}></div>
        </div>
    )
}

export default CustomScrollbar
