import * as React from "react";
import styles from "./FloatingLink.module.scss";
import cn from "classnames";

import { gsap } from "gsap";
import { useEffect } from "react";

type Props = {
  name: string;
  imgUrl: string;
  bgColor: string;
  url: string;
  idx: number;
};

const FloatingLink: React.FC<Props> = ({ name, imgUrl, bgColor, url, idx }) => {
  const ref = React.createRef<HTMLSpanElement>();
  const ref2 = React.createRef<HTMLImageElement>();

  useEffect(() => {
    gsap.to(ref.current, {
      duration: 0.1,
      height: 120,
      width: 120,

      ease: "bounce",
      delay: 0.5 + 0.2 * idx,
    });
    gsap.to(ref.current, {
      height: 80,
      width: 80,
      duration: 0.1,

      ease: "bounce",
      delay: 0.6 + 0.2 * idx,
    });
    gsap.to(ref2.current, {
      opacity: 1,
      duration: 0.2,

      delay: 0.6 + 0.2 * idx,
    });
  }, []);

  const hovering = (value: boolean) => {
    gsap.to(ref.current, {
      height: value ? 110 : 80,
      width: value ? 110 : 80,
      duration: 0.05,
      ease: "bounce",
    });
  };
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        styles.heroLink,
        "round-link",
        styles[`heroLink${idx + 1}`]
      )}
      onMouseEnter={() => hovering(true)}
      onMouseLeave={() => hovering(false)}
    >
      <span
        className="hero-link-el"
        style={{ backgroundColor: bgColor }}
        ref={ref}
      >
        <img src={imgUrl} alt={name} ref={ref2} className="hero-img-el" />
      </span>
    </a>
  );
};

export default FloatingLink;
