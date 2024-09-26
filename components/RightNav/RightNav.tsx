import React, { useState } from 'react'
import styles from './RightNav.module.scss'
import Link from 'next/link'
//:TODO: add link to homepage 等的
const RightNav = () => {
    const [isRightNavVisible, setIsRightNavVisible] = useState(false) // 控制右侧导航栏是否可见
    const toggleRightNav = () => {
        setIsRightNavVisible(!isRightNavVisible)
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
                        <Link href="/" className={styles.navLink}>
                            ffan Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/#work" className={styles.navLink}>
                            Work
                        </Link>
                    </li>
                    <li>Awards</li>
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
