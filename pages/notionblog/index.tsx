import * as React from 'react'

import { ExtendedRecordMap } from 'notion-types'

// import { NotionPages } from '../../components/NotionPages/NotionPages'
import { rootNotionPageId } from '../../lib/config'
import notion from '../../lib/notion'

import { NotionRenderer } from 'react-notion-x'
import Link from 'next/link'
import { NotionPage } from '../../components/NotionPages/NotionPages'



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
    return <NotionPage recordMap={recordMap}       
        rootPageId={rootNotionPageId} />
}
