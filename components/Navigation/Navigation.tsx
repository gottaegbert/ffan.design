import Link from "next/link";
import * as React from "react";
import styles from "./Navigation.module.scss";
import cn from "classnames";
import { gsap } from "gsap";
import { useEffect } from "react";

const Navigation = () => {
  const navigation = React.createRef<HTMLDivElement>();

  useEffect(() => {
    gsap.to(".nav-el", {
      duration: 1,
      opacity: 1,
      yPercent: 100,
      ease: "power4",
      delay: 0.5,
      stagger: 0.1,
    });
  }, []);
  return (
    <nav className={styles.nav} ref={navigation}>
      <Link href="/">
        <a className={cn("nav-el")}>Home</a>
      </Link>
      <label className={styles.switch}>
        <input type="checkbox" />
          <span className={styles.slider}></span>
      </label>

      {/* <Link href="/about">
        <a className={cn(styles.aboutLink, styles.navLink, "nav-el")}>About(need to update)</a>
      </Link> */}

      {/* <div className={styles.ddContainer}>
        <p className={cn(styles.ddTitle, "small", "nav-el")}>Connect</p>
        <ul className={styles.dropdown}>
          <a href="mailto:gottaegbert@gmail.com">
            <img src={"/assets/icons/gmail.svg"} alt="Gmail" />
            <span>Gmail</span>
          </a>
          <a
            href="https://www.linkedin.com/in/tommaso-laterza"
            target="_blank"
            rel="noreferrer"
          >
            <img src={"/assets/icons/linkedin.svg"} alt="Linkedin" />
            <span>Linkedin</span>
          </a>
          <a
            href="https://github.com/gottaegbert"
            target="_blank"
            rel="noreferrer"
          >
            <img src={"/assets/icons/github.svg"} alt="Github" />
            <span>Github</span>
          </a>
        </ul>
      </div> */}
    </nav>
  );
};

export default Navigation;
