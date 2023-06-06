import * as React from "react";
import styles from "./Footer.module.scss";
import cn from "classnames";
import RoundLink from "../RoundLink/RoundLink";
import StaggeredTitle from "../StaggeredTitle/StaggeredTitle";

type Props = {};

const Footer: React.FC<Props> = ({}) => {
  return (
    <footer className={styles.footer}>
      <div className={"grid"}>
        <div className={cn("col-12", styles.ctaContainer)}>
          <StaggeredTitle
            label1="Get in"
            label2="Touch"
            classname={styles.footerTitle}
          />
          <RoundLink
            label={"Fire me an Email"}
            url={"mailto:gottaegbert@gmail.com"}
          />
        </div>
        <div className={cn("col-12", styles.bottom)}>
          <p className={"xsmall"}>gottaegbert [at] gmail.com</p>
          <p className={"xsmall"}>Portfolio 2023/Made by Next.js</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
