import React, { useState, useRef, useEffect } from 'react'
import styles from './CaseStudy.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { gsap } from 'gsap/dist/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Image from 'next/legacy/image'
import { selectedProject } from '../../utils/customTypes'

gsap.registerPlugin(ScrollTrigger)

const CaseStudy: React.FC<selectedProject> = ({
    image,
    slug,
    title,
    tags,
    time,
}) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const skeletonRef = useRef<HTMLDivElement>(null)
    const shineRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    
    // Setup skeleton animation on mount
    useEffect(() => {
        if (!skeletonRef.current || !shineRef.current) return
        
        // Create shine animation
        const shineTl = gsap.timeline({ repeat: -1 })
        shineTl.fromTo(
            shineRef.current,
            { x: "-100%" },
            { x: "100%", duration: 1.5, ease: "power2.inOut" }
        )
        
        return () => {
            shineTl.kill()
        }
    }, [])
    
    // Handle image loading
    useEffect(() => {
        if (imageLoaded && skeletonRef.current) {
            // 图片加载完成后，降低骨架屏的不透明度
            gsap.to(skeletonRef.current, {
                opacity: 0.2,
                duration: 0.3
            })
        }
    }, [imageLoaded])

    return (
        <Link legacyBehavior href={slug}>
            <a className={styles.projWrap}>
                <article>
                    <div ref={containerRef} className={styles.imgContainer}>
                        <div 
                            ref={skeletonRef} 
                            className={styles.skeleton}
                        >
                            <div ref={shineRef} className={styles.skeletonShine}></div>
                        </div>
                        
                        {image.endsWith('.mp4') ? (
                            <video
                                src={'/' + image}
                                autoPlay
                                loop
                                playsInline
                                controls={false}
                                muted
                                className={cn(
                                    styles.pgImage,
                                    'js-img selected-pj-img'
                                )}
                                onLoadedData={() => setImageLoaded(true)}
                            />
                        ) : (
                            <Image
                                src={'/' + image}
                                layout="fill"
                                alt={title}
                                className={cn(
                                    styles.pgImage,
                                    'js-img selected-pj-img'
                                )}
                                onLoadingComplete={() => setImageLoaded(true)}
                                placeholder="empty"
                            />
                        )}
                    </div>

                    <div className={cn(styles.bottom)}>
                        <div className={'tagContainer'}>
                            {tags.map((tag, ix) => (
                                <React.Fragment key={'tag' + ix}>
                                    <p>[{tag}]</p>
                                    <p className={'small indentbig'}>
                                        {' '}
                                        {time}
                                    </p>
                                </React.Fragment>
                            ))}
                        </div>
                        <p className="indent">{title}</p>
                    </div>
                </article>
            </a>
        </Link>
    )
}

export default CaseStudy
