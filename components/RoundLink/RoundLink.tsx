import * as React from "react";
import styles from "./RoundLink.module.scss";
import cn from "classnames";
import Link from "next/link";

type Props = {
  label: string;
  url: string;
  internal?: boolean;
  classname?: string;
};

const RoundLink: React.FC<Props> = ({
  label,
  url,
  internal = false,
  classname,
}) => {
  return (
    <>
      {internal ? (
        <Link href={url}>
          <a className={cn(styles.roundLink, classname, "round-link")}>
            {label}
          </a>
        </Link>
      ) : (
        <a
          className={cn(styles.roundLink, classname, "round-link")}
          target="_blank"
          rel="noreferrer"
          href={url}
        >
          {label}
        </a>
      )}
    </>
  );
};

export default RoundLink;
