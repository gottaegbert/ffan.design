import * as React from "react";
import styles from "./CaseStudy.module.scss";
import cn from "classnames";
import Link from "next/link";

import { gsap } from "gsap/dist/gsap";
import { useEffect } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
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
              <img src={"../../assets/icons/arrow.svg"} alt="Arrow" />
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
