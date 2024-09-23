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
import Image from "next/legacy/image";
import RightNav from "../../components/RightNav/RightNav";

type Props = {
  data: project;
  moreProjs: selectedProject[];
  slug: string;
};

const ProjectPage: React.FC<Props> = ({ data, moreProjs, slug }) => {
  const title = React.createRef<HTMLDivElement>();
  const imgForeground = React.createRef<HTMLDivElement>();
  const isVideo = data.video;
  function VIDEO() {
    return (
      <div className={styles.videoContainer}>
        <video src={`/${data.video}`} controls width="100%" height="720px" />
      </div>
    );
  }

  function Picture() {
    return (
      <div className={styles.imageContainer}>
        <Image
          src={`/${data.image}`}
          alt={data.title}
          layout="responsive"
          height={9}
          width={16}
          objectFit="contain"
          className={styles.projImage}
        />
        <div ref={imgForeground} className={styles.imgForeground}></div>
      </div>
    );
  }

  const headerComponent = isVideo ? <VIDEO /> : <Picture />;
  useEffect(() => {
    gsap.set(title.current, { opacity: 1, yPercent: 100 });
    gsap.to(title.current, {
      duration: 1,
      yPercent: 0,
      ease: "power4",
      stagger: 0.1,
      delay: 0.2,
    });
    gsap.to(imgForeground.current, {
      duration: 1,
      width: 0,
      ease: "power4",
      stagger: 0.2,
      delay: 0.2,
    });
  }, []);

  return (
    <StoreProvider>
      <Layout>
        <BasicMeta url={slug} />
        <RightNav />
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
          {headerComponent}
          <div className={cn("col-12", "description")}>
            <ReactMarkdown className="fade-in-up">
              {data.description}
            </ReactMarkdown>
          </div>
          {/* date and link 4 category */}
          <div
            className={cn("grid no-pad fade-in-up", styles.bottomTitleSection)}
          >
            <div className={"col-6 col-sm-4 col-lg-3"}>
              <p className={cn("small ", styles.label)}>Client</p>
              <p className={styles.keyFact}>{data.company}</p>
            </div>
            {/* <div className={"col-6 col-sm-4 col-lg-3"}>
              <p className={cn("small", styles.label)}>Project date</p>
              <p className={styles.keyFact}>{data.date}</p>
            </div> */}
            <div className={"col-6 col-sm-4 col-lg-3"}>
              <p className={cn("small", styles.label)}>Project/Process Link</p>
              <p className={styles.keyFact}>
                <a href={data.link} rel="noreferrer" target="_blank">
                  <img src="/assets/icons/link.svg" alt="" />
                </a>
              </p>
            </div>

            <div className={"col-6 col-sm-4 col-lg-3"}>
              <p className={cn("small", styles.label)}>Prototype/Demo Link</p>
              <p className={styles.keyFact}>
                <a href={data.prototypeLink} rel="noreferrer" target="_blank">
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
          {/* content */}

          {data.imageContent && (
            <>
              <div className={cn(styles.detailLabel)}>
                <h5 className="fade-in-up">Content</h5>
              </div>
              <div className={styles.imageContainer}>
                {data.imageContent.map((content, idx: number) => {
                  const isVideo = content.endsWith(".mp4");

                  return (
                    <div
                      className={cn(styles.skillsCell, "fade-in-up")}
                      key={"stack" + idx}
                    >
                      {isVideo ? (
                        <video
                          src={`/${content}`}
                          controls
                          className={styles.projImage}
                          // your video css styles
                        />
                      ) : (
                        <Image
                          src={`/${content}`}
                          alt={data.title}
                          layout="responsive"
                          height={1080}
                          width={1920}
                          quality={100}
                          objectFit="cover"
                          placeholder="blur"
                          blurDataURL={`/${content}`}
                          className={styles.projImage}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className={cn("col-12", styles.divider)}></div>
        </section>
        <section className={cn("grid sectionSpacing", styles.moreWorksSection)}>
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
    (el: project) => el.slug.toLowerCase() == params?.pageSlug?.toLowerCase(),
  )[0];

  const homeData = await gePageData("homepage");
  const selectedPjs = homeData.selectedProjects.filter(
    (el: selectedProject) => el.slug !== `/projects/${params?.pageSlug}`,
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
