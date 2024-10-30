import { useState, useEffect } from 'react'

export const useResponsive = () => {
    const [isMobile, setIsMobile] = useState(true) // 默认为 mobile

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        handleResize() // 初始检查
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return isMobile
}
