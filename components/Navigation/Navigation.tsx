import Link from "next/link";
import * as React from "react";
import styles from "./Navigation.module.scss";
import cn from "classnames";
import { gsap } from "gsap";
import { useEffect, useState } from "react";

const Navigation = () => {
  // add type argument

  const navigation = React.createRef<HTMLDivElement>();
  const [darkTheme, setDarkTheme] = useState(undefined);
  const handleToggle = (event: { target: { checked: any; }; }) => {
    setDarkTheme(event.target.checked);
  }
 

  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        document.documentElement.setAttribute("data-theme", "dark");
        window.localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme');
        window.localStorage.setItem('theme', 'light');
      }
    }
  }, [darkTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode'
    );
    // Set initial darkmode to light
    setDarkTheme(initialColorValue === 'dark');
  }, []);

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
      {/* <div class="theme-switch-wrapper">
        <label class="theme-switch" for="checkbox">
          <input type="checkbox" id="checkbox" />
          <div class="slider round"></div>
        </label>
        <em>Enable Dark Mode!</em>
      </div> */}
      <label className={styles.switch}>
        <input type="checkbox" checked={darkTheme} onChange={handleToggle} />
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
