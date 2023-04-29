import * as React from 'react'

import { ExtendedRecordMap } from 'notion-types'

// import { NotionPages } from '../../components/NotionPages/NotionPages'
import { rootNotionPageId } from '../../lib/config'
import notion from '../../lib/notion'
import dynamic from 'next/dynamic'
import { NotionRenderer } from 'react-notion-x'
import Link from 'next/link'

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

export default function Page({ recordMap }: { recordMap: ExtendedRecordMap }) {
    return <NotionRenderer recordMap={recordMap}
        components={{
            PageLink: (props: {
                href: any;
                children:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            }) => {
                return <Link href={`/notionblog/${props.href}`}>{props.children}</Link>;
            },
            Code,
            Collection,
            Equation,
            Modal,
            Pdf,
        }}
        showCollectionViewDropdown={false}
        // searchNotion={config.isSearchEnabled ? searchNotion : null}
        rootPageId={rootNotionPageId} />
}
