import * as React from 'react'
import styles from './AwardsCase.module.scss'
import cn from 'classnames'
import Image from 'next/legacy/image'
import { selectedAward } from '../../utils/customTypes'

interface AwardsCaseProps extends selectedAward {
    isLargeItem: boolean;
}

const AwardsCase: React.FC<AwardsCaseProps> = ({
    image,
    title,
    designer,
    awardlevel,
    awardname,
    time,
    isLargeItem
}) => {
    const ref = React.createRef<HTMLDivElement>()
 
    return (
     
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

    )
}

export default AwardsCase
