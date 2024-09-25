import * as React from 'react'
import styles from './Footer.module.scss'
import cn from 'classnames'
import logo from '../../public/assets/images/logo.svg'
import Image from 'next/image'

type Props = {}

const Footer: React.FC<Props> = ({}) => {
    return (
        <footer className={styles.footer}>
            <div className={`${'grid'} ${styles.bottom}`}>
                <Image src={logo} alt="FFAN Design Logo" className={'col-1'} />
                <div className={'col-4'}>
                    <p className={'small'}>ffan.design</p>
                    <br />

                    <p className={'small'}>
                        is an industrial and graphic design studio Based in
                        Brooklyn & Beijing
                    </p>
                </div>
                <div className={'col-3'}>
                    <p>Contact Us</p>
                    <br />
                    <div className={styles.twop}>
                        <p>Email</p>
                        <p>info@ffandesign.com</p>
                    </div>

                    <div className={styles.twop}>
                        <p>Instagram</p>
                        <p>@ffan.design</p>
                    </div>
                    <div className={styles.twop}>
                        <p>Phone</p>
                        <p>+86 13260458928</p>
                    </div>
                </div>

                <div className={'col-4'}>
                    <p>Address</p>
                    <br />
                    <div className={styles.twop}>
                        <p>China</p>
                        <p>Wangjingyuan D-602, Beijing. 100102</p>
                    </div>
                    <div className={styles.twop}>
                        <p>US</p>
                        <p>100 Steuben 4D, Brooklyn, NY 11205</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
