import * as React from "react";
import styles from "../CaseStudy/CaseStudy.module.scss";
import cn from "classnames";
import Image from "next/legacy/image";
import Link from "next/link";

type Props = {
  title: string;
  image: string;
  url?: string;
  time?: string;
  slug?: string;
  description?: string;
  tags?: string[];
};

const Work: React.FC<Props> = ({ image, title, time, slug, tags }) => {
   const ref = React.createRef<HTMLDivElement>();
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

          <div className={cn(styles.bottom)}>
            <div className={"tagContainer"}>
              {tags.map((tag, ix) => (
                <>
                  <p className={"small"} key={"tag" + ix}>
                    [{tag}]
                  </p>
                  <p className={"small indentbig"}> {time}</p>
                </>
              ))}
            </div>
            <p className="small indent">{title}</p>
          </div>
        </article>
      </a>
    </Link>
  );
};

export default Work;
