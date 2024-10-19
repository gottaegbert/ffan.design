import * as React from "react";
import styles from "./Work.module.scss";
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
                    {image.endsWith('.mp4') ? (
                            <video
                                src={'/' + image}
                                autoPlay
                                loop
                                playsInline
                                controls={false}
                                muted
                                className={cn(
                                    styles.pgImage,
                                    'js-img selected-pj-img'
                                )}
                            />
                        ) : (
                            <Image
                                src={'/' + image}
                                layout="fill"
                                alt={title}
                                className={cn(
                                    styles.pgImage,
                                    'js-img selected-pj-img'
                                )}
                                
                            />
                        )}

                    </div>

                    <div className={cn(styles.bottom)}>
                        <div className={'tagContainer'}>
                            {tags.map((tag, ix) => (
                                <React.Fragment key={'tag' + ix}>
                                    <p >
                                        [{tag}]
                                    </p>
                                    <p className={'small indentbig'}> {time}</p>
                                </React.Fragment>
                            ))}
                        </div>
                        <p className="indent">{title}</p>
                    </div>
                </article>
      </a>
    </Link>
  );
};

export default Work;
