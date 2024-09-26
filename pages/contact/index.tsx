// import React, { useRef, useEffect } from 'react'
// import { gsap } from 'gsap/dist/gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
// import { aboutPageData, selectedProject } from '../../utils/customTypes'
// import { GetStaticProps } from 'next'
// import { gePageData } from '../../utils/pages'

// gsap.registerPlugin(ScrollTrigger)

// type Props = {
//     data: aboutPageData
//     projData: selectedProject[]
// }

// const Contact: React.FC<Props> = ({ data }) => {
//     const mainRef = useRef<HTMLElement | null>(null) // main container reference
//     const snapTriggers = useRef<ScrollTrigger[]>([]) // store triggers for each panel

//     useEffect(() => {
//         // Ensure the panels are properly typed as HTML elements
//         const panels = gsap.utils.toArray('.panel') as HTMLElement[] // get all panels as HTMLElement[]
//         let scrollPositions: number[] = []

//         // Create ScrollTriggers for each panel
//         panels.forEach((panel, i) => {
//             snapTriggers.current[i] = ScrollTrigger.create({
//                 trigger: panel,
//                 start: 'top top',
//             })
//         })

//         // Calculate snap points when ScrollTrigger is refreshed
//         ScrollTrigger.addEventListener('refresh', () => {
//             scrollPositions = snapTriggers.current.map(
//                 (trigger) => trigger.start || 0
//             )
//         })

//         // Add scroll snapping functionality
//         ScrollTrigger.observe({
//             type: 'wheel,touch',
//             onChangeY(self) {
//                 let scrollY = window.scrollY + self.deltaY
//                 // Ensure closest is a number
//                 let closest = gsap.utils.snap(
//                     scrollPositions,
//                     scrollY
//                 ) as number

//                 // Check that closest is  valid number before proceeding
//                 if (!isNaN(closest)) {
//                     gsap.to(window, {
//                         scrollTo: { y: closest, autoKill: false },
//                         duration: 0.8,
//                         ease: 'power1.inOut',
//                     })
//                 }
//             },
//         })

//         ScrollTrigger.refresh() // Refresh triggers to calculate positions

//         return () => {
//             ScrollTrigger.getAll().forEach((trigger) => trigger.kill()) // Clean up
//         }
//     }, [])

//     return (
//         <main ref={mainRef}>
//             <section
//                 className="panel"
//                 style={{ height: '100vh', background: '#ffadad' }}
//             >
//                 <h1>Panel 1</h1>
//             </section>
//             <section
//                 className="panel"
//                 style={{ height: '100vh', background: '#ffd6a5' }}
//             >
//                 <h1>Panel 2</h1>
//             </section>
//             <section
//                 className="panel"
//                 style={{ height: '100vh', background: '#fdffb6' }}
//             >
//                 <h1>Panel 3</h1>
//             </section>
//             <section
//                 className="panel"
//                 style={{ height: '100vh', background: '#caffbf' }}
//             >
//                 <h1>Panel 4</h1>
//             </section>
//         </main>
//     )
// }

// export default Contact

// export const getStaticProps: GetStaticProps = async () => {
//     const data = gePageData('about')
//     const projData = gePageData('homepage').selectedProjects

//     return {
//         props: {
//             data,
//             projData,
//         },
//     }
// }
