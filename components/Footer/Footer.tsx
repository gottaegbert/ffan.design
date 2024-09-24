import * as React from 'react'
import styles from './Footer.module.scss'
import cn from 'classnames'

type Props = {}

const Footer: React.FC<Props> = ({}) => {
    return (
        <footer className={styles.footer}>
            <div className={'grid'}>
                <div className={cn('col-12', styles.ctaContainer)}></div>
                <div className={cn('col-12', styles.bottom)}>
                    <p className={'xsmall'}>gottaegbert [at] gmail.com</p>
                    <p className={'xsmall'}>Portfolio 2023/Made by Next.js</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
