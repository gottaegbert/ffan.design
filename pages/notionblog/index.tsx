import * as React from 'react'

import { ExtendedRecordMap } from 'notion-types'

// import { NotionPages } from '../../components/NotionPages/NotionPages'
import { rootNotionPageId } from '../../lib/config'
import notion from '../../lib/notion'

import { NotionRenderer } from 'react-notion-x'
import Link from 'next/link'



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
        fullPage={true}
        showCollectionViewDropdown={false}
        // searchNotion={config.isSearchEnabled ? searchNotion : null}
        rootPageId={rootNotionPageId} />
}
