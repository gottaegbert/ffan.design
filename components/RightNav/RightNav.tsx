import React, { useState } from 'react'
import styles from './RightNav.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'  // 添加这行

const RightNav = () => {
    const router = useRouter()  // 添加这行
    const [isRightNavVisible, setIsRightNavVisible] = useState(false) // 控制右侧导航栏是否可见
    const toggleRightNav = () => {
        setIsRightNavVisible(!isRightNavVisible)
    }

    const handleHomeClick = (e) => {
        e.preventDefault()
        router.push('/')
        setIsRightNavVisible(false)  // 关闭导航栏
    }

    const handleWorkClick = (e) => {
        e.preventDefault()
        if (router.pathname === '/') {
            // 如果已经在主页，直接滚动到 Work 部分
            document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth' })
        } else {
            // 如果不在主页，先导航到主页，然后滚动到 Work 部分
            router.push('/#work-section')
        }
        setIsRightNavVisible(false)  // 关闭导航栏
    }

    return (
        <div>
            {/* 汉堡菜单按钮 */}
            <button
                className={`${styles.hamburgerMenu} ${isRightNavVisible ? styles.graphicDesignExpanded : ''}`}
                onClick={toggleRightNav}
            >
                &#9776; {/* Unicode for hamburger icon */}
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
