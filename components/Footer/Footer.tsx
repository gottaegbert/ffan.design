import * as React from 'react'
import styles from './Footer.module.scss'
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
                    <div className={styles.contactInfo}>
                        <div className={styles.labels}>
                            <p>Email</p>
                            <p>Instagram</p>
                            <p>Phone</p>
                        </div>
                        <div className={styles.details}>
                            <p>ffandesign.info@gmail.com</p>
                            <p>@ffan.design</p>
                            <p>+86 13260458928</p>
                        </div>
                    </div>
                </div>

                <div className={'col-4'}>
                    <p>Address</p>
                    <br />
                    <div className={styles.contactInfo}>
                        <div className={styles.labels}>
                            <p>China</p>
                            <p>US</p>
                        </div>
                        <div className={styles.details}>
                            <p>Wangjingyuan D-602, Beijing. 100102</p>
                            <p>100 Steuben 4D, Brooklyn, NY 11205</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
