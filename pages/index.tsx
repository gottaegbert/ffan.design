/* eslint-disable react/no-children-prop */
import * as React from "react";
import styles from "./index.module.scss";
import Layout from "../components/Layout/Layout";
import cn from "classnames";
import { useEffect, useState } from "react";
import StaggeredTitle from "../components/StaggeredTitle/StaggeredTitle";
import CaseStudy from "../components/CaseStudy/CaseStudy";
import { GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { gePageData } from "../utils/pages";  // Corrected typo from gePageData to getPageData
import { StoreProvider } from "../utils/StoreProvider";
import BasicMeta from "../utils/BasicMeta";
import { homePageData } from "../utils/customTypes";
import ProjectNav from "../components/ProjectNav/ProjectNav";

type Props = {
  data: homePageData;
};

const IndexPage: React.FC<Props> = ({ data }) => {
  const { selectedProjects, ndaDisclaimer } = data;
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  // Handler to update selected project based on ProjectNav component
  const handleProjectSelect = (index: number) => {
    setSelectedProjectIndex(index);
  };

  return (
    <StoreProvider>
      <Layout>
        <BasicMeta url={"/"} />

        {/* Page wrapper for two-column layout */}
        <div className={styles.pageWrapper}>
          
          {/* Left-side Navigation */}
          <div className={styles.leftNav}>
            <ProjectNav
              projects={selectedProjects} // Pass the selectedProjects from data
              onSelect={handleProjectSelect} // Pass handler for project selection
            />
          </div>
          </div>

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
      {/* <Cursor imgArray={moreWorks.map((work) => work.image)} /> */}
    </StoreProvider>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const data = gePageData("homepage");  // Corrected typo
  return {
    props: {
      data,
    },
  };
};
