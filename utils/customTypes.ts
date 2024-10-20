export type homePageData = {
    selectedProjects: selectedProject[]
    selectedAwards: selectedAward[]
}

export type selectedAward = {
    title: string
    image: string

    time: string
    types: string
    designer: string
    awardlevel: string
    awardname: string
}

export type selectedProject = {
    image: string
    slug: string
    types: string
    tags: string[]
    title: string
    time: string
}

export type moreWork = {
    image: string
    url: string
    description: string
    title: string
}

type TeamMember = {
    Name: string
    Role: string
    Description: string
    image: string
}

export type aboutPageData = {
    aboutus: string
    ourwork: string
    ourservice1: string
    ourservice2: string
    teams: TeamMember[]
}

export type project = {
    video: string
    imageContent: Array<{
        endsWith: any
        category: string
        body: string
    }>
    prototypeLink: string
    title: string
    image: string
    slug: string
    types: string
    tags: string[]
    description: string
    designconcept: string
    designer: string
    date: string
}
