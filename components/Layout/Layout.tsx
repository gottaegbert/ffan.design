import * as React from "react";
import { gsap } from "gsap/dist/gsap";
import { useEffect } from "react";
import CustomScrollbar from "../CustomScrollbar/CustomScrollbar";
import { useRouter } from 'next/router';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

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
      <main>{children}</main>
      {router.pathname !== '/' && <CustomScrollbar />}
    </>
  );
};

export default Layout;
