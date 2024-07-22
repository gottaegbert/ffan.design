/* eslint-disable react/no-children-prop */
import * as React from "react";
import styles from "./index.module.scss";
import cn from "classnames";
import Layout from "../components/Layout/Layout";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import StaggeredTitle from "../components/StaggeredTitle/StaggeredTitle";
import CaseStudy from "../components/CaseStudy/CaseStudy";

import { GetStaticProps } from "next";
import Cursor from "../components/Cursor/Cursor";
import ReactMarkdown from "react-markdown";
import { gePageData } from "../utils/pages";
import { StoreProvider } from "../utils/StoreProvider";
import BasicMeta from "../utils/BasicMeta";
import { homePageData } from "../utils/customTypes";
import { createLocomotive } from '../utils/locomotive';

import ProjectNav from "../components/ProjectNav/ProjectNav";



type Props = {
  data: homePageData;
};

const IndexPage: React.FC<Props> = ({ data }) => {
  const {

    selectedProjects,
    moreWorks,
    ndaDisclaimer,
  } = data;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    
    const locomotiveScroll = createLocomotive();
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0); // Scroll to start (in case page is reloaded)
    }, 2000);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      gsap.set(".hero-text-line", { opacity: 0, yPercent: 103 });
      gsap.to(".hero-text-line", {
        duration: 1,
        yPercent: 0,
        opacity: 1,
        ease: "power4",
        stagger: 0.5,
      
      });
}

  }, [isLoading]);



  useEffect(() => {
    const tl = gsap.timeline({})
    
    tl.to("h2 div", { duration: 3, yPercent: 0, stagger: 0, ease: "sine" })
    tl.delay(2)
    tl.to("h2 div", { yPercent: 103, duration: 5, stagger: 0, ease:'sine' })
    tl.delay(2)
    tl.to("h2 div", { yPercent: 0, duration: 3, stagger: 0, ease: "sine", })
    // tl.to("h2", { autoAlpha: 1 })
    

    tl.repeat(-1);
    tl.repeatDelay(2);
    
  }, []);



  return (
    <StoreProvider>
   
      <Layout>

        <BasicMeta url={"/"} />


            <section className={cn("sectionSpacing", styles.selectedWorkContainer)}>
          <div className={cn("hero-text", styles.heroText)}>
            <h1 className={cn("hero-text-line", styles.heroTextLine)}>
           
                    <section className={styles.projectNavSection}>
   
             <ProjectNav projects={selectedProjects} onSelect={undefined}  />
        </section>
            </h1>
          </div>
          </section>
      {/* <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence> */}
        <section className={cn("sectionSpacing", styles.selectedWorkContainer)}>
          <div className="grid">
            <div className={"col-12 "}>
              <StaggeredTitle
                label1="Selected"
                label2="Projects"
                classname={styles.projTitle}
              />
            </div>

            {selectedProjects.map((proj, idx: number) => (
              <div
                key={"proj" + idx}
                className={cn("col-12 col-sm-4", styles.caseStudyCol, {
                  [styles.offsetCol]: idx === 1,
                })}
              >
                <CaseStudy {...proj} />
              </div>
            ))}
            <div className={"col-12 col-sm-6 "}>
              <ReactMarkdown className={cn("fade-in-up", styles.nda)}>
                {ndaDisclaimer}
              </ReactMarkdown>
            </div>
          </div>
        </section>
     
      </Layout>
      <Cursor imgArray={moreWorks.map((work) => work.image)} />
    </StoreProvider>
  )
}

export default IndexPage;




export const getStaticProps: GetStaticProps = async () => {
  const data = gePageData("homepage");
  return {
    props: {
      data,
    },
  };
};
