import React, { useEffect, useRef, useState } from 'react'
import styles from './CustomScrollbar.module.scss'

const CustomScrollbar: React.FC = () => {
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [scrollPercentage, setScrollPercentage] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight =
                document.documentElement.scrollHeight - window.innerHeight
            const currentScroll = window.pageYOffset
            const newScrollPercentage = (currentScroll / scrollHeight) * 100
            setScrollPercentage(newScrollPercentage)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // 初始化滚动条位置

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (scrollbarRef.current) {
            const scrollbarHeight =
                scrollbarRef.current.parentElement?.clientHeight || 0
            const scrollbarThumbHeight = scrollbarRef.current.clientHeight
            const maxTop = scrollbarHeight - scrollbarThumbHeight
            const newTop = (scrollPercentage / 100) * maxTop
            scrollbarRef.current.style.top = `${newTop}px`
        }
    }, [scrollPercentage])

    return (
        <div className={styles.customScrollbarContainer}>
            <div ref={scrollbarRef} className={styles.customScrollbar}></div>
        </div>
    )
}

export default CustomScrollbar
