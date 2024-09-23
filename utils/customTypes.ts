export type homePageData = {
  aboutShort: string;
  selectedProjects: selectedProject[];
  moreWorksDesc: string;
  moreWorks: moreWork[];
  ndaDisclaimer: string;
};

export type selectedProject = {
  image: string;
  slug: string;
  types: string;
  tags: string[];
  title: string;
  time: string;
};

export type moreWork = {
  image: string;
  url: string;
  description: string;
  title: string;
};

export type aboutPageData = {
  avatar: string;
  intro: string;
  description: string;
  skill: string[];
};

export type project = {
  video: string;
  imageContent: Array<{
    category: string;
    body: string;
  }>;
  prototypeLink: string;
  title: string;
  image: string;
  slug: string;
  types: string;
  tags: string[];
  description: string;
  designer: string;
  github: string;
  link: string;
  frame: string;
  date: string;
  stack: string[];
  textBlock: Array<{
    category: string;
    body: string;
  }>;
};
