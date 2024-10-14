import React, { useState, useEffect } from 'react'
import styles from './RightNav.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

const RightNav = () => {
    const router = useRouter()
    const [isRightNavVisible, setIsRightNavVisible] = useState(false)
    
    useEffect(() => {
        // 检查是否在主页
        const isHomePage = router.pathname === '/'
        
        if (isHomePage) {
            // 如果是主页，立即展开导航栏
            setIsRightNavVisible(true)
            
            // 设置定时器，3秒后关闭导航栏
            const timer = setTimeout(() => {
                setIsRightNavVisible(false)
            }, 3000)

            // 在组件卸载或路由变化时清除定时器
            return () => clearTimeout(timer)
        } else {
            // 如果不是主页，确保导航栏是关闭的
            setIsRightNavVisible(false)
        }
    }, [router.pathname]) // 依赖于路由路径，这样在路由变化时会重新执行

    const toggleRightNav = () => {
        setIsRightNavVisible(!isRightNavVisible)
    }

    const handleHomeClick = (e) => {
        e.preventDefault()
        router.push('/')
        setIsRightNavVisible(false)
    }

    const handleWorkClick = (e) => {
        e.preventDefault()
        if (router.pathname === '/') {
            document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' })
        } else {
            router.push('/#work-section')
        }
        setIsRightNavVisible(false)
    }

    return (
        <div>
            {/* 汉堡菜单按钮 */}
            <button
                className={`${styles.hamburgerMenu} ${isRightNavVisible ? styles.graphicDesignExpanded : ''}`}
                onClick={toggleRightNav}
            >
                &#9776;
            </button>

            {/* 右侧导航栏 */}
            <aside
                className={`${styles.rightNav} ${isRightNavVisible ? styles.visible : ''}`}
            >
                <ul>
                    <li>
                        <Link href="/" onClick={handleHomeClick} className={styles.navLink}>
                            ffan Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/#work-section" onClick={handleWorkClick} className={styles.navLink}>
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link href="/awards" className={styles.navLink}>
                            Awards
                        </Link>
                    </li>
                    <li>
                        <Link href="/team" className={styles.navLink}>
                            Team
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className={styles.navLink}>
                            Contact
                        </Link>
                    </li>
                </ul>
                <div className={styles.contactInfo}>
                    <p>Based in Brooklyn & Beijing</p>
                    <p>Instagram: ffan.design</p>
                    <p>Email: info@ffandesign.com</p>
                </div>
            </aside>
        </div>
    )
}

export default RightNav
