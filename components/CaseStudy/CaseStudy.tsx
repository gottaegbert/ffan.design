import * as React from 'react'
import styles from './CaseStudy.module.scss'
import cn from 'classnames'
import Link from 'next/link'

import { gsap } from 'gsap/dist/gsap'
import { useEffect } from 'react'
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
    const ref = React.createRef<HTMLDivElement>()
    // useEffect(() => {
    //   // 设置初始状态
    //   gsap.set(ref.current, {
    //     height: "100%",
    //   });

    //   // 定义动画
    //   const animation = gsap.to(ref.current, {
    //     scrollTrigger: {
    //       trigger: ref.current,
    //       start: "top 100%",
    //     },
    //     duration: 1.4,
    //     height: 0,
    //     ease: "power4",
    //   });

    //   // 当组件卸载时，清除动画
    //   return () => {
    //     animation.kill();
    //   };
    // }, [slug, image]);

    return (
        <Link legacyBehavior href={slug}>
            <a className={styles.projWrap}>
                <article>
                    <div className={styles.imgContainer}>
                        <Image
                            src={'/' + image}
                            layout="fill"
                            alt={title}
                            className={cn(
                                styles.pgImage,
                                'js-img selected-pj-img'
                            )}
                        />

                        <div className={styles.imgForeground} ref={ref}></div>
                    </div>

                    <div className={cn(styles.bottom)}>
                        <div className={'tagContainer'}>
                            {tags.map((tag, ix) => (
                                <>
                                    <p className={'small'} key={'tag' + ix}>
                                        [{tag}]
                                    </p>
                                    <p className={'small indentbig'}> {time}</p>
                                </>
                            ))}
                        </div>
                        <p className="small indent">{title}</p>
                    </div>
                </article>
            </a>
        </Link>
    )
}

export default CaseStudy
