import { useEffect, useState } from "react";
import styles from "./Cursor.module.scss";
import cn from "classnames";
import React, { useContext } from "react";
import { Context } from "../../utils/StoreProvider";
type Props = {
  imgArray?: string[];
};

const Cursor: React.FC<Props> = ({ imgArray }) => {
  const { mouse } = useContext(Context);
  const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
  };
  useEffect(() => {
    addEventListeners();
    handleLinkHoverEvents();
    return () => removeEventListeners();
  }, []);

  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [projLinkHovered, setProjLinkHovered] = useState(false);
  const [workLinkHovered, setWorkLinkHovered] = useState(false);
  const [roundLinkHovered, setRoundLinkHovered] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  const addEventListeners = () => {
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mouseenter", onMouseEnter);
    document.removeEventListener("mouseleave", onMouseLeave);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const handleLinkHoverEvents = () => {
    // Project Links
    const projs = document.getElementsByClassName("selected-pj-img");
    Array.from(projs).forEach((proj) => {
      proj.addEventListener("mouseover", () => {
        setProjLinkHovered(true);
      });
      proj.addEventListener("mouseout", () => {
        setProjLinkHovered(false);
      });
    });

    // works Links
    const work = document.getElementsByClassName("work-proj");
    Array.from(work).forEach((work, idx) => {
      work.addEventListener("mouseover", () => {
        setWorkLinkHovered(true);
        setActiveIdx(idx);
      });
      work.addEventListener("mouseout", () => {
        setWorkLinkHovered(false);
        setActiveIdx(-1);
      });
    });

    // Round Links
    const roundLinks = document.getElementsByClassName("round-link");
    Array.from(roundLinks).forEach((link) => {
      link.addEventListener("mouseover", () => {
        setRoundLinkHovered(true);
      });
      link.addEventListener("mouseout", () => {
        setRoundLinkHovered(false);
      });
    });

    // Links
    document.querySelectorAll("a").forEach((el, idx) => {
      el.addEventListener("mouseover", () => {
        setLinkHovered(true);
      });
      el.addEventListener("mouseout", () => setLinkHovered(false));
    });
  };

  const cursorClasses = cn(styles.cursor, {
    [styles.cursor_clicked]: clicked,
    [styles.cursor_hidden]: hidden,
    [styles.cursor_link_hovered]: linkHovered,
    [styles.cursor_proj_link_hovered]: projLinkHovered,
    [styles.cursor_work_link_hovered]: workLinkHovered,
    [styles.cursor_round_link_hovered]: roundLinkHovered,
  });
  if (typeof navigator !== "undefined" && isMobile()) return null;

  return (
    <>
      <div
        className={cursorClasses}
        style={{
          left: `${mouse.x}px`,
          top: `${mouse.y}px`,
          backgroundImage:
            workLinkHovered && imgArray
              ? `url(../../${imgArray[activeIdx]})`
              : "none",
        }}
      />
    </>
  );
};

export default Cursor;
