import * as React from 'react'
import styles from './AwardsCase.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { selectedAward } from '../../utils/customTypes'

interface AwardsCaseProps extends selectedAward {
    isLargeItem: boolean;
}

const AwardsCase: React.FC<AwardsCaseProps> = ({
    image,
    title,
    types,
    designer,
    awardlevel,
    slug,
    awardname,
    time,
    isLargeItem
}) => {
    const ref = React.createRef<HTMLDivElement>()
 
    return (
        <Link legacyBehavior href={slug}>
            <a className={styles.projWrap}>
                <article className={cn(styles.article, { [styles.largeItem]: isLargeItem })}>
                    <div className={styles.imgContainer}>
                        {image.endsWith('.mp4') ? (
                            <video
                                src={'/' + image}
                                autoPlay
                                loop
                                playsInline
                                controls={false}
                                muted
                                className={cn(styles.pgImage, 'js-img selected-pj-img')}
                            />
                        ) : (
                            <Image
                                src={'/' + image}
                                layout="fill"
                                alt={title}
                                className={cn(styles.pgImage, 'js-img selected-pj-img')}
                            />
                        )}
                        <div className={styles.imgForeground} ref={ref}></div>
                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.nametimecontainer}>
                            <p className={styles.info}>{title}</p>
                            <p className={styles.info}>{time}</p>
                        </div>
                        <h1 className={styles.award}>{awardname}</h1>
                        <div className={styles.infocontainer}>
                            <p className={styles.info}>Award</p>
                            <p className={styles.info}>{awardlevel}</p>
                        </div>
                        <div className={styles.infocontainer}>
                            <p className={styles.info}>Designer</p>
                            <p className={styles.info}>{designer}</p>
                        </div>
                    </div>
                </article>
            </a>
        </Link>
    )
}

export default AwardsCase
