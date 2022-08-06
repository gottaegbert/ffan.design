import * as React from "react";
import styles from "./project.module.scss";
import cn from "classnames";

import { gsap } from "gsap";
import { useEffect } from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout/Layout";

import StaggeredTitle from "../../components/StaggeredTitle/StaggeredTitle";
import Work from "../../components/Work/Work";
import ReactMarkdown from "react-markdown";
import Cursor from "../../components/Cursor/Cursor";
import { StoreProvider } from "../../utils/StoreProvider";
import { gePageData } from "../../utils/pages";
import BasicMeta from "../../utils/BasicMeta";
import { project, selectedProject } from "../../utils/customTypes";
import Image from "next/image";

type Props = {
  data: project;
  moreProjs: selectedProject[];
  slug: string;
};
const ProjectPage: React.FC<Props> = ({ data, moreProjs, slug }) => {
  const title = React.createRef<HTMLDivElement>();
  const imgForeground = React.createRef<HTMLDivElement>();

  useEffect(() => {
    gsap.set(title.current, { opacity: 1 });
    gsap.from(title.current, {
      duration: 1,
      yPercent: 100,
      ease: "power4",
      stagger: 0.1,
      delay: 0.2,
    });
    gsap.to(imgForeground.current, {
      duration: 1,
      width: 0,
      ease: "power4",
      stagger: 0.1,
      delay: 0.2,
    });
  }, []);

  return (
    <StoreProvider>
      <Layout>
        <BasicMeta url={slug} />
        <section className={cn("grid", styles.prjTitleSection)}>
          <div className={styles.prjTitleContainer}>
            <h1 className={styles.title}>
              <span>
                <span ref={title} className={styles.titleSpan}>
                  {data.title}
                </span>
              </span>
            </h1>
   
          </div>
          <div className={styles.imageContainer}>
              <Image
                src={`/${data.image}`}
                alt={data.title}
                layout="responsive"
                height={9}
                width={16}
                objectFit="cover"
                className={styles.projImage}
              />
              <div ref={imgForeground} className={styles.imgForeground}></div>
            </div>
          <div className={cn("col-12", "description")}>
            <ReactMarkdown className="fade-in-up">
              {data.description}
            </ReactMarkdown>
          </div>
          <div
            className={cn("grid no-pad fade-in-up", styles.bottomTitleSection)}
          >
            <div className={"col-6 col-sm-4 col-lg-3"}>
              <p className={cn("small ", styles.label)}>Client</p>
              <p className={styles.keyFact}>{data.company}</p>
            </div>
            <div className={"col-6 col-sm-4 col-lg-3"}>
              <p className={cn("small", styles.label)}>Project date</p>
              <p className={styles.keyFact}>{data.date}</p>
            </div>
            <div className={"col-6 col-sm-4 col-lg-3"}>
              <p className={cn("small", styles.label)}>Project Link</p>
              <p className={styles.keyFact}>
                <a href={data.link} rel="noreferrer" target="_blank">
                  <img src="/assets/icons/link.svg" alt="" />
                </a>
              </p>
              
            </div>
            {data.github && (
              <div className={"col-6 col-sm-4 col-lg-3"}>
                <p className={cn("small", styles.label)}>Code</p>
                <p className={styles.keyFact}>
                  <a href={data.github} rel="noreferrer" target="_blank">
                    <img src="/assets/icons/github.svg" alt="" />
                  </a>
                </p>
              </div>
            )}
          </div>
        </section>
        <section
          className={cn("grid sectionSpacing", styles.projDetailsSection)}
        >
          {data.textBlock.map((block, idx) => (
            <React.Fragment key={idx}>
              <div
                className={cn("col-12 col-md-3 col-lg-4", styles.detailLabel)}
              >
                <h5 className="fade-in-up">{block.category}</h5>
              </div>
              <div
                className={cn("col-12 col-md-9 col-lg-8", styles.detailBody)}
              >
                <ReactMarkdown className="fade-in-up">
                  {block.body}
                </ReactMarkdown>
              </div>
            </React.Fragment>
          ))}
          {data.stack && (
            <>
              <div
                className={cn("col-12 col-md-3 col-lg-4", styles.detailLabel)}
              >
                <h5 className="fade-in-up">Stack</h5>
              </div>
              <div
                className={cn("col-12 col-md-9 col-lg-8", styles.skillsGrid)}
              >
                {data.stack.map((tool, idx: number) => (
                  <div
                    className={cn(styles.skillsCell, "fade-in-up")}
                    key={"stack" + idx}
                  >
                    <p>{tool}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className={cn("col-12", styles.divider)}></div>
        </section>
        <section className={cn("grid sectionSpacing", styles.moreWorksSection)}>
          <div className={"col-12 col-sm-6 col-md-5"}>
            <StaggeredTitle
              label1="More"
              label2="Projects"
              classname={styles.projTitle}
            />
          </div>
          <div className={"col-12 col-sm-6 col-md-7"}>
            {moreProjs.map((work, idx: number) => (
              <Work {...work} key={"work" + idx} />
            ))}
          </div>
        </section>
      </Layout>
      <Cursor imgArray={moreProjs.map((work) => work.image)} />
    </StoreProvider>
  );
};

export default ProjectPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await gePageData("projects").projects.filter(
    // @ts-ignore
    (el: project) => el.slug.toLowerCase() == params?.pageSlug?.toLowerCase()
  )[0];

  const homeData = await gePageData("homepage");
  const selectedPjs = homeData.selectedProjects.filter(
    (el: selectedProject) => el.slug !== `/projects/${params?.pageSlug}`
  );
  const works = homeData.moreWorks;
  const moreProjs = [...selectedPjs, ...works];
  const slug = params?.pageSlug;

  return {
    props: {
      data,
      moreProjs,
      slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await gePageData("homepage")
    .selectedProjects.map((pj: selectedProject) => pj.slug)
    .map((el: string) => el.split("/")[2]);
  return {
    paths: slugs.map((el: string) => {
      return { params: { pageSlug: el } };
    }),
    fallback: false,
  };
};
