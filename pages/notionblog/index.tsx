import * as React from 'react'

import { ExtendedRecordMap } from 'notion-types'

// import { NotionPages } from '../../components/NotionPages/NotionPages'
import { rootNotionPageId } from '../../lib/config'
import notion from '../../lib/notion'
import dynamic from 'next/dynamic'
import { NotionRenderer } from 'react-notion-x'
import { NotionPages } from '../../components/NotionPages/NotionPages'

const Code = dynamic(() =>
    import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
    import('react-notion-x/build/third-party/collection').then(
        (m) => m.Collection
    )
)
const Equation = dynamic(() =>
    import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
    () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
    {
        ssr: false
    }
)
const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
    {
        ssr: false
    }
)

export const getStaticProps = async () => {
    const pageId = rootNotionPageId
    const recordMap = await notion.getPage(pageId)

    return {
        props: {
            recordMap
        },
        revalidate: 10
    }
}

// export default ({ recordMap }) => (
//     <NotionRenderer
//         recordMap={recordMap}
//         components={{
//             Code,
//             Collection,
//             Equation,
//             Modal,
//             Pdf
//         }}
//     />
// )

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
    return <NotionPages recordMap={recordMap}
        // searchNotion={config.isSearchEnabled ? searchNotion : null}
        rootPageId={rootNotionPageId} />
}
