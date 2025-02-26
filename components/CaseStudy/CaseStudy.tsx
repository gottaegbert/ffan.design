import React, { useState } from 'react'
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

    return (
        <Link legacyBehavior href={slug}>
            <a className={styles.projWrap}>
                <article>
            
                        
                  
              
                        <div className={styles.imgContainer}>
                        <div className={`${styles.skeleton} ${imageLoaded ? styles.hidden : ''}`}></div>
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
                                        imageLoaded ? styles.loaded : styles.loading,
                                        'js-img selected-pj-img'
                                    )}
                                    onLoadingComplete={() => setImageLoaded(true)}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAJAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+xT/gmL/wWQ/aP/akfte+I/hh+0P4r8HeLNC0n4WeMfF/hG2svBPh/wAOXVnrtpq/hiOK6utQ0jTbW6u4JLLWrvyY5Z3SMm4YqGKlV/lVvY7f/gjL/wAqmvxU/wCzw/2xf/Tz+z3X9FP7EX/BSb9lr9m+b9o34d/FHx7pGgfFvwh8cvHvw1+D0jPJHp3xU8O3urNfnRrK9FrNaQ+KtOm1fZ5d8qz3FvbWu9Utbm32T/0lftFf8E5v+Cj/AIO/4Ju/tFfCH4W/Br4neGvHWp/sr/GLSNM8R3XhnxTdw2154c8HarA97ZYNRL+Ss0TCQx/MMYYqcZ/j2pKUZe0dSm5VKb/eSTu4u6U5pK8WtGtrNpJo/Cqlac5yhzTcoTnGNWcnKSTbjFylFXcdE04u6aujP//Z"
                             
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
