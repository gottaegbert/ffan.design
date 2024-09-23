import React, { useState } from "react";
import styles from "./RightNav.module.scss";

const RightNav = () => {
  const [isRightNavVisible, setIsRightNavVisible] = useState(false); // 控制右侧导航栏是否可见
  const toggleRightNav = () => {
    setIsRightNavVisible(!isRightNavVisible);
  };

  return (
    <div>
      {/* 汉堡菜单按钮 */}
      <button
        className={`${styles.hamburgerMenu} ${isRightNavVisible ? styles.graphicDesignExpanded : ""}`}
        onClick={toggleRightNav}
      >
        &#9776; {/* Unicode for hamburger icon */}
      </button>

      {/* 右侧导航栏 */}
      <aside
        className={`${styles.rightNav} ${isRightNavVisible ? styles.visible : ""}`}
      >
        <ul>
          <li>ffan Home</li>
          <li>Works</li>
          <li>Awards</li>
          <li>Team</li>
          <li>Contact</li>
        </ul>
        <div className={styles.contactInfo}>
          <p>Based in Brooklyn & Beijing</p>
          <p>Instagram: ffan.design</p>
          <p>Email: info@ffandesign.com</p>
        </div>
      </aside>
    </div>
  );
};

export default RightNav;
