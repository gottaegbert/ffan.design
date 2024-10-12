import * as React from "react";
import styles from "./StaggeredTitle.module.scss";
import cn from "classnames";
import { gsap } from "gsap/dist/gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type Props = {
  label1: string;
  label2: string;
  label3: string;
  classname?: string;
  onLabelClick: (label: string) => void;
  activeLabel?: string; // 添加这个属性
};

gsap.registerPlugin(ScrollTrigger);

const StaggeredTitle: React.FC<Props> = ({
  label1,
  label2,
  label3,
  classname,
  onLabelClick,
  activeLabel, // 接收 activeLabel 属性
}) => {
  const ref1 = React.createRef<HTMLSpanElement>();
  const ref2 = React.createRef<HTMLSpanElement>();
  const ref3 = React.createRef<HTMLSpanElement>();

  useEffect(() => {
    gsap.set([ref1.current, ref2.current, ref3.current], {
      opacity: 0,
      xPercent: 100,
    });
    gsap.to([ref1.current, ref2.current, ref3.current], {
      scrollTrigger: {
        trigger: ref1.current,
        start: "top 140%",
      },
      duration: 1.2,
      xPercent: 0,
      opacity: 1,
      ease: "power4",
      stagger: 0.2,
    });
  }, []);

  return (
    <h3 className={cn(styles.title, classname)}>
      <span>
        <span
          ref={ref1}
          onClick={() => onLabelClick(label1)}
          className={cn({ [styles.selected]: activeLabel === label1 })}
        >
          {label1}
        </span>
        <span
          ref={ref2}
          className={cn(styles.offset, {
            [styles.selected]: activeLabel === label2,
          })}
          onClick={() => onLabelClick(label2)}
        >
          {label2}
        </span>
        <span
          ref={ref3}
          className={cn(styles.offset, {
            [styles.selected]: activeLabel === label3,
          })}
          onClick={() => onLabelClick(label3)}
        >
          {label3}
        </span>
      </span>
    </h3>
  );
};

export default StaggeredTitle;
