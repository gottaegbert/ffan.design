import * as React from "react";
import { Suspense } from 'react';
import styles from "./index.module.scss";
import cn from "classnames";
import Layout from "../components/Layout/Layout";

import { gsap } from "gsap";
import { useEffect } from "react";
import FloatingLink from "../components/FloatingLink/FloatingLink";
import StaggeredTitle from "../components/StaggeredTitle/StaggeredTitle";
import CaseStudy from "../components/CaseStudy/CaseStudy";
import Work from "../components/Work/Work";
import { SplineD } from "../components/SplineD/SplineD"
import Link from "next/link";
import { GetStaticProps } from "next";
import Cursor from "../components/Cursor/Cursor";
import ReactMarkdown from "react-markdown";
import { gePageData } from "../utils/pages";
import { StoreProvider } from "../utils/StoreProvider";
import BasicMeta from "../utils/BasicMeta";
import { homePageData } from "../utils/customTypes";
import dynamic from 'next/dynamic';
import Spline from "@splinetool/react-spline";
// import Spline from '@splinetool/react-spline';




const floatingLinksData = [
  {
    name: "Linkedin",
    imgUrl: "../assets/icons/linkedin.svg",
    bgColor: "#E7F1F7",
    url: "https://www.linkedin.com/in/siyu-hu-838755151/",
  },
  {
    name: "Gmail",
    imgUrl: "../assets/icons/gmail.svg",
    bgColor: "#FBEDEA",
    url: "mailto:gottaegbert@gmail.com",
  },
  {
    name: "Github",
    imgUrl: "../assets/icons/github.svg",
    bgColor: "#E7E7E7",
    url: "https://github.com/gottaegbert",
  },
];

type Props = {
  data: homePageData;
};

const IndexPage: React.FC<Props> = ({ data }) => {
  const {
    aboutShort,
    selectedProjects,
    moreWorksDesc,
    moreWorks,
    ndaDisclaimer,
  } = data;

  useEffect(() => {
    gsap.set(".hero-text-line", { opacity: 1 });
    gsap.from(".hero-text-line", {
      duration: 1,
      yPercent: 100,
      ease: "power4",
      stagger: 0.1,
      delay: 0.2,
    });
  }, []);

  return (
    <StoreProvider>
   
       
      <Layout>
        
        <BasicMeta url={"/"} />
        <div className={cn(styles.heroContainer)}>
          <section className={cn("grid")}>
            <div
              className={cn(
                "col-12 col-start-md-2 col-end-md-11 col-start-lg-2 col-end-lg-11"
              )}
            >
             
              <h1 className={styles.name}>
                <span>
                  <span className={"hero-text-line"}>Egbert Hu</span>
                </span>
              </h1>
              <h2 className={styles.subTitle}>
                <span className={styles.offset}>
                  <span className={"hero-text-line"}>IxD Designer</span>
                </span>
                <span>
                  <span className={"hero-text-line"}>Web Developer</span>
                </span>
              </h2>
            </div>
            
            <div className={styles.heroLinkContainer}>
              {floatingLinksData.map((link, idx) => (
                <FloatingLink {...link} idx={idx} key={idx} />
              ))}
            </div>
            <SplineD/>
            {/* <Spline className=".Spline" scene="https://prod.spline.design/9gAl2QkNdQPJbd19/scene.splinecode" /> */}
          </section>
        </div>
        <section className={cn("grid sectionSpacing", styles.aboutSection)}>
          <div
            className={cn("col-12 col-sm-7 col-md-6 col-lg-5", styles.aboutCol)}
          >
            <p className={"fade-in-up description"}>{aboutShort}</p>
            {/* <Link href="/about">
              <a className={"fade-in-up"}>About me</a>
            </Link> */}
          </div>
        </section>
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
                className={cn("col-12 col-sm-6", styles.caseStudyCol, {
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
        <section className={cn("grid sectionSpacing", styles.moreWorksSection)}>
          <div className={"col-12 col-sm-6 col-md-5"}>
            <StaggeredTitle
              label1="More"
              label2="Works"
              classname={styles.projTitle}
            />
          </div>
          <div className={"col-12 col-sm-6 col-md-7"}>
            <ReactMarkdown
              linkTarget="_blank"
              className="description fade-in-up"
            >
              {moreWorksDesc}
            </ReactMarkdown>
            {moreWorks.map((work, idx: number) => (
              <Work {...work} key={"work" + idx} />
            ))}
          </div>
        </section>
      </Layout>
      <Cursor imgArray={moreWorks.map((work) => work.image)} />
    </StoreProvider>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const data = gePageData("homepage");

  return {
    props: {
      data,
    },
  };
};
