import React, { useState, useEffect } from 'react'
import styles from './RightNav.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface RightNavProps {
    autoExpand?: boolean
}

const RightNav: React.FC<RightNavProps> = ({ autoExpand = false }) => {
    const router = useRouter()
    const [isRightNavVisible, setIsRightNavVisible] = useState(false)

    useEffect(() => {
        setIsRightNavVisible(autoExpand)
    }, [autoExpand])

    const toggleRightNav = () => {
        setIsRightNavVisible(!isRightNavVisible)
    }
    const handleHomeClick = (e) => {
        e.preventDefault()

        router.push('/').then(() => {
            // 等待路由跳转完成后，滚动到指定元素
            const pageWrapper = document.getElementById('page-wrapper')
            if (pageWrapper) {
                pageWrapper.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        })

        setIsRightNavVisible(false)
    }

    const handleWorkClick = (e) => {
        e.preventDefault()
        if (router.pathname === '/') {
            document
                .getElementById('work-section')
                ?.scrollIntoView({ behavior: 'smooth' })
        } else {
            router.push('/?section=work').then(() => {
                setTimeout(() => {
                    document
                        .getElementById('work-section')
                        ?.scrollIntoView({ behavior: 'smooth' })
                }, 300)
            })
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
                className={`${styles.rightNav} 
                            ${isRightNavVisible ? styles.visible : ''} 
                            ${autoExpand ? styles.visible : ''}`}
            >
                <ul>
                    <li>
                        <Link
                            href="/"
                            onClick={handleHomeClick}
                            className={styles.navLink}
                        >
                            ffan Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#work-section"
                            onClick={handleWorkClick}
                            className={styles.navLink}
                        >
                            Works
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
