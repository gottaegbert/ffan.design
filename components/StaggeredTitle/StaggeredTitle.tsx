import * as React from "react";
import styles from "./StaggeredTitle.module.scss";
import cn from "classnames";
import { gsap } from "gsap/dist/gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type Props = {
  label1: string;
  label2: string;
  classname?: string;
};
gsap.registerPlugin(ScrollTrigger);

const StaggeredTitle: React.FC<Props> = ({ label1, label2, classname }) => {
  const ref1 = React.createRef<HTMLSpanElement>();
  const ref2 = React.createRef<HTMLSpanElement>();

  useEffect(() => {
    gsap.from([ref1.current, ref2.current], {
      scrollTrigger: {
        trigger: ref1.current,
        start: "top 90%",
      },
      duration: 1.2,
      yPercent: 100,
      ease: "power4",
      stagger: 0.2,
    });
  }, []);

  return (
    <h3 className={cn(styles.title, classname)}>
      <span>
        <span ref={ref1}>{label1}</span>
      </span>
      <span>
        <span ref={ref2} className={cn(styles.offset)}>
          {label2}
        </span>
      </span>
    </h3>
  );
};

export default StaggeredTitle;
