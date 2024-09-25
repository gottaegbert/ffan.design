import * as React from 'react'
import styles from './Footer.module.scss'
import cn from 'classnames'
import logo from '../../public/assets/images/logo.svg'
import Image from 'next/image'

type Props = {}

const Footer: React.FC<Props> = ({}) => {
    return (
        <footer className={styles.footer}>
            <div className={'grid'}>
                <div className={cn('col-12', styles.ctaContainer)}></div>
                <div className={cn('col-12', styles.bottom)}>
                    <Image
                        src={logo}
                        alt="FFAN Design Logo"
                        className={'col-2'}
                    />
                    <div className={'col-3'}>
                        <p className={'small'}>ffan.design</p>

                        <p className={'small'}>
                            is an industrial and graphic design studio Based in
                            Brooklyn & Beijing
                        </p>
                    </div>
                    <div className={'col-3'}>
                        <p className={'small bold'}>Contact Us</p>

                        <p className={'small'}>Email</p>
                        <p className={'small'}>info@ffandesign.com</p>

                        <p className={'small'}>Instagram</p>
                        <p className={'small'}>ffan.design</p>
                        <p className={'small'}>Phone</p>
                        <p className={'small'}>+86 13260458928</p>
                    </div>

                    <div>
                        <p className={'small'}>Address</p>

                        <p className={'small'}>China</p>
                        <p className={'small'}>
                            Wangjingyuan D-602, Beijing. 100102
                        </p>

                        <p className={'small'}>US</p>
                        <p className={'small'}>
                            100 Steuben 4D, Brooklyn, NY 11205
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
