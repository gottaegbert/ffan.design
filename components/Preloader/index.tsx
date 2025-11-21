import { useCallback, useEffect, useState, useRef } from 'react'
import styles from './Preloader.module.scss'
import { motion, AnimatePresence } from 'framer-motion'

const MIN_PROGRESS_MS = 2000

type PreloaderProps = {
    onComplete: () => void
    onVideoReady?: () => void
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete, onVideoReady }) => {
    const [dimension, setDimension] = useState({ width: 0, height: 0 })
    const videoRef = useRef<HTMLVideoElement>(null)
    const hasNotifiedVideoStart = useRef(false)
    const hasRequestedProgressFinish = useRef(false)
    const progressStartRef = useRef<number | null>(null)
    const progressTimeoutRef = useRef<number | null>(null)
    const [isVideoEnded, setIsVideoEnded] = useState(false)
    const [isVideoReady, setIsVideoReady] = useState(false)
    const [isProgressVisible, setIsProgressVisible] = useState(true)
    const [videoLoadProgress, setVideoLoadProgress] = useState(0)

    const handleVideoEnd = useCallback(() => {
        setIsVideoEnded(true)
        setTimeout(() => {
            onComplete()
        }, 500)
    }, [onComplete])

    const completeProgressAfterMinDuration = useCallback(
        (onDone?: () => void) => {
            if (hasRequestedProgressFinish.current) return
            hasRequestedProgressFinish.current = true

            const startedAt = progressStartRef.current ?? performance.now()
            const elapsed = performance.now() - startedAt
            const remaining = Math.max(MIN_PROGRESS_MS - elapsed, 0)

            if (progressTimeoutRef.current) {
                window.clearTimeout(progressTimeoutRef.current)
            }

            progressTimeoutRef.current = window.setTimeout(() => {
                setVideoLoadProgress(100)
                setIsProgressVisible(false)
                onDone?.()
            }, remaining)
        },
        []
    )

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })
        progressStartRef.current = performance.now()

        return () => {
            if (progressTimeoutRef.current) {
                window.clearTimeout(progressTimeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const updateProgress = () => {
            if (!video.duration || Number.isNaN(video.duration)) return
            const buffered = video.buffered
            if (!buffered.length) return
            const bufferedEnd = buffered.end(buffered.length - 1)
            const progress = Math.min(
                Math.round((bufferedEnd / video.duration) * 100),
                100
            )
            setVideoLoadProgress((prev) => Math.max(prev, progress))
        }

        const handleCanPlay = () => {
            setIsVideoReady(true)
            updateProgress()
            video.play().catch(() => null)
            completeProgressAfterMinDuration()
        }

        const handlePlay = () => {
            if (hasNotifiedVideoStart.current) return
            hasNotifiedVideoStart.current = true
            onVideoReady?.()
            completeProgressAfterMinDuration()
        }

        const handleError = () => {
            setIsVideoReady(true)
            setVideoLoadProgress(100)
            onVideoReady?.()
            completeProgressAfterMinDuration(() => {
                handleVideoEnd()
            })
        }

        video.addEventListener('ended', handleVideoEnd)
        video.addEventListener('progress', updateProgress)
        video.addEventListener('loadeddata', updateProgress)
        video.addEventListener('canplay', handleCanPlay)
        video.addEventListener('canplaythrough', handleCanPlay)
        video.addEventListener('play', handlePlay)
        video.addEventListener('error', handleError)

        return () => {
            video.removeEventListener('ended', handleVideoEnd)
            video.removeEventListener('progress', updateProgress)
            video.removeEventListener('loadeddata', updateProgress)
            video.removeEventListener('canplay', handleCanPlay)
            video.removeEventListener('canplaythrough', handleCanPlay)
            video.removeEventListener('play', handlePlay)
            video.removeEventListener('error', handleError)
        }
    }, [completeProgressAfterMinDuration, handleVideoEnd, onVideoReady])

    useEffect(() => {
        if (!isVideoReady || !videoRef.current) return
        if (videoRef.current.paused) {
            videoRef.current.play().catch(() => null)
        }
        completeProgressAfterMinDuration()
    }, [completeProgressAfterMinDuration, isVideoReady])

    useEffect(() => {
        if (!isProgressVisible) return
        const timer = window.setInterval(() => {
            setVideoLoadProgress((prev) => {
                if (prev >= 90) return prev
                return prev + 1
            })
        }, 200)

        return () => {
            window.clearInterval(timer)
        }
    }, [isProgressVisible])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
        dimension.width / 2
    } ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
        dimension.width / 2
    } ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
        },
    }

    const containerVariants = {
        initial: { y: 0 },
        exit: {
            y: '-100%',
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
        },
    }

    return (
        <AnimatePresence>
            {!isVideoEnded && (
                <motion.div
                    variants={containerVariants}
                    initial="initial"
                    animate="initial"
                    exit="exit"
                    className={styles.introduction}
                >
                    <video
                        ref={videoRef}
                        className={styles.backgroundVideo}
                        src="./assets/images/loading.mp4"
                        muted
                        playsInline
                        preload="auto"
                    />
                    <AnimatePresence>
                        {isProgressVisible && (
                            <motion.div
                                className={styles.prePreloader}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.35 } }}
                            >
                                <div className={styles.progressLabel}>
                                    Loading intro... {videoLoadProgress}%
                                </div>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${Math.min(videoLoadProgress, 100)}%` }}
                                    ></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {dimension.width > 0 && (
                        <svg className={styles.svgCurve}>
                            <motion.path
                                variants={curve}
                                initial="initial"
                                exit="exit"
                            ></motion.path>
                        </svg>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Preloader
