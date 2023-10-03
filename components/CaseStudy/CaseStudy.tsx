import * as React from "react";
import styles from "./CaseStudy.module.scss";
import cn from "classnames";
import Link from "next/link";

import { gsap } from "gsap/dist/gsap";
import { useEffect } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/legacy/image";
import { selectedProject } from "../../utils/customTypes";

gsap.registerPlugin(ScrollTrigger);

const CaseStudy: React.FC<selectedProject> = ({ image, slug, title, tags }) => {
  const ref = React.createRef<HTMLDivElement>();
  useEffect(() => {
    gsap.set(ref.current, {
      height: "100%",
    });
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 100%",
      },
      duration: 1.4,
      height: 0,
      ease: "power4",
    });
  }, []);



  return (
    <Link legacyBehavior href={slug}>
      <a className={styles.projWrap}>
        <article>
          <div className={styles.imgContainer}>
            <Image
              src={"/" + image}
              layout="fill"
              alt={title}
              className={cn(styles.pgImage, "js-img selected-pj-img")}
            />

            <div className={styles.imgForeground} ref={ref}></div>
          </div>

          <div className={cn(styles.bottom, "fade-in-up")}>
            <h4>{title}</h4>
            <div className={styles.arrowContainer}>
              <svg width="38" height="24" viewBox="0 0 38 24"  xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M37.0607 13.0607C37.6464 12.4749 37.6464 11.5251 37.0607 10.9393L27.5147 1.3934C26.9289 0.807611 25.9792 0.807611 25.3934 1.3934C24.8076 1.97919 24.8076 2.92893 25.3934 3.51472L33.8787 12L25.3934 20.4853C24.8076 21.0711 24.8076 22.0208 25.3934 22.6066C25.9792 23.1924 26.9289 23.1924 27.5147 22.6066L37.0607 13.0607ZM0 13.5L36 13.5V10.5L0 10.5L0 13.5Z"
                  />
              </svg>

              <div className={styles.arrowBg}></div>
            </div>
          </div>
          <div className={"tagContainer"}>
            {tags.map((tag, ix) => (
              <p className={"small fade-in-up"} key={"tag" + ix}>
                {tag}
              </p>
            ))}
          </div>
        </article>
      </a>
    </Link>
  );
};

export default CaseStudy;
