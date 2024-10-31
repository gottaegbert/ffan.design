import React, { useState, useEffect } from 'react'
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
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // 模拟加载过程
        const timer = setTimeout(() => setIsLoaded(true), 1000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <Link legacyBehavior href={slug}>
            <a
                className={`${styles.projWrap} ${isLoaded ? styles.loaded : ''}`}
            >
                <div>
                    <article>
                        <div className={styles.imgContainer}>
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
                </div>
            </a>
        </Link>
    )
}

export default CaseStudy
