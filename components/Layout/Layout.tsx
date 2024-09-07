import * as React from "react";
// import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import { gsap } from "gsap/dist/gsap";
import { useEffect } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    initAnimations();
  }, []);

  const initAnimations = () => {
    const fadeInUpTween = document.querySelectorAll(".fade-in-up");
    fadeInUpTween.forEach((item, idx) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 180%",
        },
        y: 40,
        opacity: 1,
        duration: 1,
        ease: "Power2.easeOut",
      });
    });
  };

  return (
    <>
      {/* <Navigation /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
